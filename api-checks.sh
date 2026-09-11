#!/usr/bin/env bash
# Регрессионный прогон API-кейсов из набора QA-досье Wiregate (163 кейса, 78 дефектов).
#
# Проверки написаны на ПРАВИЛЬНОЕ поведение, а не на текущее.
# Поэтому строка FAIL = найденный дефект, и после починки строка станет PASS.
#
#   bash qa/api-checks.sh                       # против localhost:8000
#   API=http://host:8000 bash qa/api-checks.sh  # против другого стенда
#
# Требуется: curl, docker (для проверок, читающих базу и логи).

set -u
API="${API:-http://localhost:8000}"
EP="$API/users/create"
DB_CONTAINER="${DB_CONTAINER:-wiregate-test-task-db-1}"
BE_CONTAINER="${BE_CONTAINER:-wiregate-test-task-backend-1}"

pass=0; fail=0; skip=0
R=$'\e[31m'; G=$'\e[32m'; Y=$'\e[33m'; D=$'\e[2m'; N=$'\e[0m'
[ -t 1 ] || { R=""; G=""; Y=""; D=""; N=""; }

ok()   { pass=$((pass+1)); printf '%sPASS%s  %-14s %s\n' "$G" "$N" "$1" "$2"; }
bad()  { fail=$((fail+1)); printf '%sFAIL%s  %-14s %s\n%s        ожидалось: %s\n        получено:  %s%s\n' \
           "$R" "$N" "$1" "$2" "$D" "$3" "$4" "$N"; }
skipp(){ skip=$((skip+1)); printf '%sSKIP%s  %-14s %s (%s)\n' "$Y" "$N" "$1" "$2" "$3"; }

post() { curl -s -o /tmp/qa_body -w '%{http_code}' --max-time 15 -X POST "$EP" \
           -H 'Content-Type: application/json' -d "$1"; }
body() { cat /tmp/qa_body; }

# code <TC> <описание> <ожидаемый код> <json>
code() {
  local tc="$1" desc="$2" want="$3" json="$4" got
  got=$(post "$json")
  if [ "$got" = "$want" ]; then ok "$tc" "$desc"
  else bad "$tc" "$desc" "HTTP $want" "HTTP $got — $(head -c 110 /tmp/qa_body)"; fi
}

# code_in <TC> <описание> <коды через пробел> <json>
code_in() {
  local tc="$1" desc="$2" want="$3" json="$4" got
  got=$(post "$json")
  case " $want " in *" $got "*) ok "$tc" "$desc";;
    *) bad "$tc" "$desc" "HTTP из набора: $want" "HTTP $got — $(head -c 110 /tmp/qa_body)";; esac
}

psql_q() { docker exec "$DB_CONTAINER" psql -U postgres -d postgres -tAc "$1" 2>/dev/null; }
have_db() { docker exec "$DB_CONTAINER" true 2>/dev/null; }

VALID='"last_name":"Dupont","phone_number":"79001234567","password":"Abcdef1!","is_agree":true'
uniq_mail() { echo "qa$(date +%s%N)@example.com"; }

echo
echo "Стенд: $EP"
echo "─────────────────────────────────────────────────────────────────"
echo "Контракт и валидация"
echo "─────────────────────────────────────────────────────────────────"

code TC-API-001 "валидное тело создаёт пользователя" 201 \
  "{\"first_name\":\"Jean\",$VALID,\"email\":\"$(uniq_mail)\"}"

code TC-API-002 "нет first_name → 400, а не 500" 400 \
  "{$VALID,\"email\":\"$(uniq_mail)\"}"

code TC-API-003 "нет last_name → 400, а не 500" 400 \
  "{\"first_name\":\"Jean\",\"phone_number\":\"79001234567\",\"password\":\"Abcdef1!\",\"is_agree\":true,\"email\":\"$(uniq_mail)\"}"

code TC-API-004 "нет email → 400" 400 \
  "{\"first_name\":\"Jean\",$VALID}"

code TC-API-005 "нет is_agree → 400" 400 \
  "{\"first_name\":\"Jean\",\"last_name\":\"D\",\"phone_number\":\"79001234567\",\"password\":\"Abcdef1!\",\"email\":\"$(uniq_mail)\"}"

code TC-API-006 "пустой объект → 400" 400 '{}'

code TC-API-007 "is_agree строкой \"false\" → 400" 400 \
  "{\"first_name\":\"Jean\",\"last_name\":\"D\",\"phone_number\":\"79001234567\",\"password\":\"Abcdef1!\",\"is_agree\":\"false\",\"email\":\"$(uniq_mail)\"}"

code TC-API-008 "is_agree числом 1 → 400" 400 \
  "{\"first_name\":\"Jean\",\"last_name\":\"D\",\"phone_number\":\"79001234567\",\"password\":\"Abcdef1!\",\"is_agree\":1,\"email\":\"$(uniq_mail)\"}"

code TC-API-009 "first_name числом → 400" 400 \
  "{\"first_name\":12345,$VALID,\"email\":\"$(uniq_mail)\"}"

code TC-API-010 "first_name массивом → 400" 400 \
  "{\"first_name\":[\"a\",\"b\"],$VALID,\"email\":\"$(uniq_mail)\"}"

# лишнее поле не должно попадать в ответ
MAIL=$(uniq_mail)
post "{\"role\":\"admin\",\"first_name\":\"Jean\",$VALID,\"email\":\"$MAIL\"}" >/dev/null
if grep -q '"role"' /tmp/qa_body; then
  bad TC-API-012 "посторонние поля отбрасываются" "в ответе нет поля role" "$(head -c 110 /tmp/qa_body)"
else ok TC-API-012 "посторонние поля отбрасываются"; fi

# ответ соответствует ShowUserDto
MAIL=$(uniq_mail)
post "{\"first_name\":\"Jean\",$VALID,\"email\":\"$MAIL\"}" >/dev/null
if grep -qE '"(id|is_agree)"' /tmp/qa_body; then
  bad TC-API-013 "ответ соответствует ShowUserDto" "только first_name, last_name, email, phone_number" "$(head -c 110 /tmp/qa_body)"
else ok TC-API-013 "ответ соответствует ShowUserDto"; fi

if grep -q '"password"' /tmp/qa_body; then
  bad TC-SEC-002b "пароль не возвращается в ответе" "поля password нет" "$(head -c 110 /tmp/qa_body)"
else ok TC-SEC-002b "пароль не возвращается в ответе"; fi

code TC-API-019 "имя из 10000 символов → 400" 400 \
  "{\"first_name\":\"$(printf 'A%.0s' $(seq 1 10000))\",$VALID,\"email\":\"$(uniq_mail)\"}"

code TC-API-020 "имя из одного пробела → 400" 400 \
  "{\"first_name\":\" \",$VALID,\"email\":\"$(uniq_mail)\"}"

code TC-API-021 "пароль из 1000 символов → 400" 400 \
  "{\"first_name\":\"Jean\",\"last_name\":\"D\",\"phone_number\":\"79001234567\",\"password\":\"Abcdefg1!$(printf 'a%.0s' $(seq 1 991))\",\"is_agree\":true,\"email\":\"$(uniq_mail)\"}"

code TC-API-022 "телефон из одной цифры → 400" 400 \
  "{\"first_name\":\"Jean\",\"last_name\":\"D\",\"phone_number\":\"7\",\"password\":\"Abcdef1!\",\"is_agree\":true,\"email\":\"$(uniq_mail)\"}"

GOT=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$API/")
if [ "$GOT" = "200" ]; then ok TC-API-017 "GET / отвечает, как заявлено в e2e-тесте"
else bad TC-API-017 "GET / отвечает, как заявлено в e2e-тесте" "HTTP 200 Service is working!" "HTTP $GOT"; fi

echo
echo "─────────────────────────────────────────────────────────────────"
echo "Согласованность фронтенда и бэкенда"
echo "─────────────────────────────────────────────────────────────────"

# password1 проходит клиентскую регулярку -> сервер обязан принять то же самое
code TC-FV-052 "пароль password1 принимается обоими слоями" 201 \
  "{\"first_name\":\"Jean\",\"last_name\":\"D\",\"phone_number\":\"79001234567\",\"password\":\"password1\",\"is_agree\":true,\"email\":\"$(uniq_mail)\"}"

# Abcdef1^ сервер принимает -> клиент обязан принимать тоже (проверяется в UI-кейсе)
code_in TC-FV-054 "спецсимвол ^ трактуется одинаково" "400" \
  "{\"first_name\":\"Jean\",\"last_name\":\"D\",\"phone_number\":\"79001234567\",\"password\":\"Abcdef1^\",\"is_agree\":true,\"email\":\"$(uniq_mail)\"}"

# имя с диакритикой: клиент отклоняет -> сервер обязан вести себя так же
code TC-FV-007b "François трактуется одинаково обоими слоями" 400 \
  "{\"first_name\":\"François\",$VALID,\"email\":\"$(uniq_mail)\"}"

echo
echo "─────────────────────────────────────────────────────────────────"
echo "Безопасность"
echo "─────────────────────────────────────────────────────────────────"

if have_db; then
  MAIL=$(uniq_mail)
  post "{\"first_name\":\"Victim\",$VALID,\"email\":\"$MAIL\"}" >/dev/null
  VID=$(psql_q "select id from users where email='$MAIL' limit 1;")
  if [ -n "$VID" ]; then
    post "{\"id\":$VID,\"first_name\":\"ATTACKER\",\"last_name\":\"Owned\",\"phone_number\":\"70000000000\",\"password\":\"Abcdef1!\",\"is_agree\":true,\"email\":\"attacker@evil.co\"}" >/dev/null
    NOW=$(psql_q "select first_name from users where id=$VID;")
    if [ "$NOW" = "Victim" ]; then ok TC-SEC-001 "поле id в теле не перезаписывает чужую строку"
    else bad TC-SEC-001 "поле id в теле не перезаписывает чужую строку" "строка $VID осталась Victim" "стала $NOW"; fi
  else skipp TC-SEC-001 "mass assignment через id" "не удалось создать исходную строку"; fi

  MAIL=$(uniq_mail)
  post "{\"first_name\":\"Hash\",$VALID,\"email\":\"$MAIL\"}" >/dev/null
  STORED=$(psql_q "select password from users where email='$MAIL' limit 1;")
  if [ "$STORED" = "Abcdef1!" ]; then
    bad TC-SEC-002 "пароль хранится в виде хеша" "хеш" "исходная строка Abcdef1!"
  elif [ -n "$STORED" ]; then ok TC-SEC-002 "пароль хранится в виде хеша"
  else skipp TC-SEC-002 "хранение пароля" "строка не найдена"; fi

  MAIL=$(uniq_mail)
  post "{\"first_name\":\"Dup\",$VALID,\"email\":\"$MAIL\"}" >/dev/null
  GOT=$(post "{\"first_name\":\"Dup\",$VALID,\"email\":\"$MAIL\"}")
  if [ "$GOT" = "409" ]; then ok TC-DB-001 "повторный email отклоняется"
  else bad TC-DB-001 "повторный email отклоняется" "HTTP 409" "HTTP $GOT"; fi

  CNT=$(psql_q "select count(*) from information_schema.columns where table_name='users' and column_name in ('created_at','updated_at');")
  if [ "$CNT" = "2" ]; then ok TC-DB-004 "у записи есть временные метки"
  else bad TC-DB-004 "у записи есть временные метки" "created_at и updated_at" "найдено колонок: ${CNT:-0}"; fi

  LEN=$(psql_q "select count(*) from information_schema.columns where table_name='users' and data_type='character varying' and character_maximum_length is null;")
  if [ "${LEN:-0}" = "0" ]; then ok TC-DB-002 "у текстовых колонок задана длина"
  else bad TC-DB-002 "у текстовых колонок задана длина" "0 колонок без ограничения" "$LEN колонок без ограничения"; fi
else
  skipp TC-SEC-001 "проверки через базу" "контейнер $DB_CONTAINER недоступен"
fi

if docker exec "$BE_CONTAINER" true 2>/dev/null; then
  MAIL=$(uniq_mail); PW="LogLeak9!"
  post "{\"first_name\":\"Log\",\"last_name\":\"D\",\"phone_number\":\"79001234567\",\"password\":\"$PW\",\"is_agree\":true,\"email\":\"$MAIL\"}" >/dev/null
  sleep 1
  if docker logs --tail 200 "$BE_CONTAINER" 2>&1 | grep -q "$PW"; then
    bad TC-SEC-003 "пароль не попадает в журнал" "пароля в журнале нет" "пароль найден в выводе контейнера"
  else ok TC-SEC-003 "пароль не попадает в журнал"; fi
else
  skipp TC-SEC-003 "пароль в журнале" "контейнер $BE_CONTAINER недоступен"
fi

CORS=$(curl -s -D - -o /dev/null -X POST "$EP" -H 'Origin: https://evil.example' \
       -H 'Content-Type: application/json' -d '{}' | grep -i '^access-control-allow-origin' | tr -d '\r')
if echo "$CORS" | grep -q '\*'; then
  bad TC-SEC-005 "CORS ограничен известным источником" "конкретный origin" "${CORS:-заголовок отсутствует}"
else ok TC-SEC-005 "CORS ограничен известным источником"; fi

HDR=$(curl -s -D - -o /dev/null -X POST "$EP" -H 'Content-Type: application/json' -d '{}' | tr -d '\r')
if echo "$HDR" | grep -qi '^x-powered-by'; then
  bad TC-SEC-008 "версия стека не раскрывается" "нет заголовка X-Powered-By" "$(echo "$HDR" | grep -i '^x-powered-by')"
else ok TC-SEC-008 "версия стека не раскрывается"; fi

# 30 запросов подряд: хотя бы один должен быть отклонён ограничителем
LIMITED=0
for i in $(seq 1 30); do
  [ "$(post "{\"first_name\":\"Spam\",$VALID,\"email\":\"spam$i-$(date +%s%N)@x.co\"}")" = "429" ] && LIMITED=1 && break
done
if [ "$LIMITED" = "1" ]; then ok TC-SEC-004 "частота регистраций ограничена"
else bad TC-SEC-004 "частота регистраций ограничена" "хотя бы один HTTP 429 из 30" "все 30 приняты"; fi

echo
echo "─────────────────────────────────────────────────────────────────"
printf 'Итог: %sPASS %d%s · %sFAIL %d%s · %sSKIP %d%s\n' "$G" "$pass" "$N" "$R" "$fail" "$N" "$Y" "$skip" "$N"
echo "FAIL здесь означает подтверждённый дефект, а не поломку прогона."
echo "Расшифровка каждого TC — в qa/test-cases.ru.csv и в опубликованном QA-досье."
[ "$fail" -gt 0 ] && exit 1
exit 0
