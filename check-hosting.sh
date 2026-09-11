#!/usr/bin/env bash
# Проверка доступности площадок статического хостинга.
#
# ЗАПУСКАТЬ С ВЫКЛЮЧЕННЫМ VPN — смысл теста именно в том, чтобы увидеть,
# что доступно вашему читателю из России напрямую.
#
#   bash qa/check-hosting.sh
#   EXTRA="https://мой.tiiny.site" bash qa/check-hosting.sh   # проверить свои адреса
#
# Проверяются домены, с которых хостинг РАЗДАЁТ сайты, а не его панель.
# Это разные вещи: у tiiny.host панель открывается, а раздача на *.tiiny.site нет.
#
# Столбцы: код ответа, время до первого байта, отдельно DNS и TCP-соединение.
# Прочерк в коде означает, что соединение не установилось вовсе.

set -u
TIMEOUT="${TIMEOUT:-8}"

# printf считает байты, а не символы, поэтому кириллицу дополняем вручную
pad() { local s="$1" w="$2" n; n=$(printf '%s' "$s" | wc -m); printf '%s%*s' "$s" $((w > n ? w - n : 0)) ""; }

row() { printf '  %s %s %s %s %s\n' "$(pad "$1" 24)" "$(pad "$2" 5)" "$(pad "$3" 9)" "$(pad "$4" 8)" "$5"; }

probe() {
  local label="$1" url="$2" note="$3"
  local out code dns conn total mark
  out=$(curl -sS -o /dev/null -A "Mozilla/5.0" --max-time "$TIMEOUT" \
        -w '%{http_code} %{time_namelookup} %{time_connect} %{time_starttransfer}' \
        "$url" 2>/dev/null) || out=""
  if [ -z "$out" ]; then
    row "$label" "—" "нет связи" "—" "—  $note"
    return
  fi
  read -r code dns conn total <<<"$out"
  mark=" "
  case "$code" in 2*|3*) mark="+";; 4*|5*) mark="~";; esac
  row "$label" "$code" "$(printf '%.2f с' "$total")" "$(printf '%.2f' "$conn")" "$mark  $note"
}

echo
echo "Проверка доступности хостингов. VPN должен быть ВЫКЛЮЧЕН."
echo "Таймаут: ${TIMEOUT} с на площадку."
echo
row "ПЛОЩАДКА" "КОД" "ОТВЕТ" "TCP" ""
echo "  ──────────────────────────────────────────────────────────────────────"

echo "  ВАЖНО: проверяются домены РАЗДАЧИ, а не панели управления."
echo "  Панель хостинга может открываться, а сайты он отдаёт с другого домена."
echo
echo "  бесплатно, без карты:"
probe "GitHub Pages"       "https://pages.github.com/"                "сам на Pages, адрес *.github.io"
probe "Neocities"          "https://neocities.org/"                   "сайты на том же домене"

echo "  российские, нужна карта:"
probe "Yandex Object Storage" "https://storage.yandexcloud.net/"      "адрес *.website.yandexcloud.net"
probe "VK Cloud S3"           "https://hb.ru-msk.vkcloud-storage.ru/" "VK Cloud"
probe "Timeweb S3"            "https://s3.timeweb.cloud/"             "Timeweb Cloud"

echo "  известно, что не работают:"
probe "Netlify"            "https://qa-kukushkin-test.netlify.app/"   "ваш прошлый сайт"
probe "Cloudflare Pages"   "https://pages.dev/"                       "*.pages.dev"
probe "Vercel"             "https://vercel.app/"                      "*.vercel.app"
probe "Render"             "https://onrender.com/"                    "*.onrender.com"
probe "Surge"              "https://surge.sh/"                        "*.surge.sh"

if [ -n "${EXTRA:-}" ]; then
  echo "  свои адреса:"
  for u in $EXTRA; do probe "$(echo "$u" | sed -E 's#https?://##; s#/.*##' | cut -c1-24)" "$u" "передан через EXTRA"; done
fi

echo
echo "  Как читать: + площадка отвечает нормально."
echo "              ~ отвечает ошибкой, но сеть доходит — площадка живая."
echo "              — соединение не установилось, читателю сайт не откроется."
echo
echo "  Смотрите на строки с + и на время ответа. Всё, что дольше трёх секунд"
echo "  или с прочерком, для ссылки в отклике не годится."
echo
