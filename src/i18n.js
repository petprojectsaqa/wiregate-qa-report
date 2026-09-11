/* Справочники областей, техник и строк интерфейса. Используется и сборщиком, и страницей. */
const AREAS = [
  {k:"fe-val",  ru:"Фронтенд · валидация полей",        en:"Frontend · field validation",     rs:"валидация полей", es:"field validation"},
  {k:"fe-form", ru:"Фронтенд · логика формы",           en:"Frontend · form logic",           rs:"логика формы",    es:"form logic"},
  {k:"fe-ui",   ru:"Фронтенд · вёрстка и адаптивность", en:"Frontend · layout and responsiveness", rs:"вёрстка",   es:"layout"},
  {k:"fe-a11y", ru:"Доступность и локализация",         en:"Accessibility and localisation",  rs:"доступность",     es:"accessibility"},
  {k:"fe-route",ru:"Маршрутизация",                     en:"Routing",                         rs:"маршрутизация",   es:"routing"},
  {k:"api",     ru:"API · контракт и валидация",        en:"API · contract and validation",   rs:"контракт API",    es:"API contract"},
  {k:"sec",     ru:"API · безопасность",                en:"API · security",                  rs:"безопасность",    es:"security"},
  {k:"data",    ru:"Данные и БД",                       en:"Data and database",               rs:"данные и БД",     es:"data"},
  {k:"infra",   ru:"Инфраструктура и сборка",           en:"Infrastructure and build",        rs:"инфраструктура",  es:"infrastructure"},
  {k:"e2e",     ru:"Сквозные сценарии",                 en:"End-to-end scenarios",            rs:"сквозные",        es:"end-to-end"},
  {k:"nfr",     ru:"Нефункциональные",                  en:"Non-functional",                  rs:"нефункциональные",es:"non-functional"}
];

const TECHS = {
  EP:{ru:["Эквивалентное разбиение","Наборы допустимых символов в имени, телефоне, адресе почты и пароле. Поймала запрет диакритики на французской форме и отказ от французского формата телефона."],
      en:["Equivalence partitioning","Accepted character sets for name, phone, email and password. It caught the ban on diacritics in a French form and the refusal of the French phone format."]},
  BVA:{ru:["Анализ граничных значений","Длины 4 и 28 для имён, 8 и 16 для телефона, 8 и 28 для пароля — значение на границе и по обе стороны от неё. Поймала смещение на единицу в текстах и отсутствие верхней границы пароля на сервере."],
      en:["Boundary value analysis","Lengths of 4 and 28 for names, 8 and 16 for phone, 8 and 28 for password — the boundary value and one step either side. It caught the off-by-one wording and the missing server-side upper bound on passwords."]},
  DT:{ru:["Таблица решений","Комбинация «пароль валиден на клиенте × валиден на сервере × сервер доступен» — четыре строки, две из которых дают ложный успех."],
      en:["Decision table","The combination of password valid on the client, valid on the server and server reachable — four rows, two of which produce a false success."]},
  STT:{ru:["Переходы состояний","Форма как автомат: Backspace необратимо переводит поле телефона в состояние без минимальной длины, а правка пароля после подтверждения — в молчаливо невалидное состояние."],
      en:["State transition testing","The form as a state machine: Backspace moves the phone field irreversibly into a state with no minimum length, and editing the password after confirmation moves the form into a silently invalid state."]},
  PW:{ru:["Попарное тестирование","Пары «тип значения × поле» для тела запроса: число, массив, строка и булево в каждом из шести полей вместо полного перебора."],
      en:["Pairwise testing","Pairs of value type against field for the request body: number, array, string and boolean in each of the six fields instead of an exhaustive sweep."]},
  EG:{ru:["Предугадывание ошибок","Целенаправленный поиск типовых промахов: подмена идентификатора, пароль в журнале, отсутствие обрезки, имя из одних пробелов, расход последовательности идентификаторов."],
      en:["Error guessing","A deliberate hunt for the usual mistakes: identifier injection, the password in the log, missing trim, a whitespace-only name, and identifier sequence consumption."]},
  SEC:{ru:["Тестирование безопасности","Чек-лист по применимым пунктам OWASP: инъекции, хранение секретов, политика источников, заголовки, ограничение частоты запросов."],
      en:["Security testing","A checklist over the applicable OWASP items: injection, secret storage, origin policy, headers and rate limiting."]},
  CMP:{ru:["Тестирование совместимости","Сравнение поведения при разных user agent и на двух разрешениях. Поймала ветку валидации, зависящую от строки браузера."],
      en:["Compatibility testing","Comparing behaviour across user agents and two resolutions. It caught the validation branch that depends on the browser string."]},
  EXP:{ru:["Исследовательские сессии","Свободные проходы по форме с установкой «что сломается, если торопиться»: двойные клики, ввод и стирание, навигация назад."],
      en:["Exploratory sessions","Free-form passes over the form with the charter “what breaks if you are in a hurry”: double clicks, typing and deleting, navigating back."]}
};

const I18N = {
ru:{
  tools:"Разделы и фильтры", nav:"Разделы", run:"Ваш прогон", filters:"Фильтры кейсов", fpri:"Приоритет", fstat:"Результат проверки", farea:"Область",
  search:"Поиск по кейсам…",
  src:"Тестовое задание · rndx2-public / wiregate-test-task · 8eedbff",
  h1:"QA-досье Wiregate",
  lede:["Форма регистрации на React, NestJS и Postgres, разобранная под тест-дизайн. ","%TC% тест-кейсов"," и ","%DEF% дефектов",", подтверждённых прогоном на живом стенде: у каждого дефекта указан фактический ответ системы, а не предположение."],
  meta:[["Стенд","Docker Compose, локально"],["Фронтенд","React 18 · CRA 5 · react-hook-form"],["Бэкенд","NestJS 8 · TypeORM 0.2 · Postgres 13"],["Точка входа","POST /users/create"],["Браузер","Chromium 1280×900 и 375×812"]],
  tldrH:"Итог за тридцать секунд",
  tldrSub:"дальше — та же информация подробнее",
  tldrIntro:"Задание — форма регистрации на французском языке и один серверный метод. Проект развёрнут локально, пройден вручную и через API, каждый дефект воспроизведён. Ниже — то, что ломает продукт для пользователя или для бизнеса.",
  tldrLines:[
    ["Пользователь видит «спасибо за регистрацию», даже когда регистрация не прошла.","Сервер отвечает ошибкой или лежит — экран успеха показывается всё равно, а учётной записи не существует."],
    ["Чужую учётную запись можно перезаписать одним запросом.","Достаточно добавить в тело регистрации идентификатор существующего пользователя: его данные заменяются, ответ при этом 201 Created."],
    ["Пароли лежат открытым текстом в базе и в журнале.","Отладочный вывод включён по умолчанию, поэтому пароли утекают в логи в любом окружении, поднятом по инструкции проекта."],
    ["Форма отказывает своей же аудитории.","Интерфейс французский, но François и Amélie ввести нельзя, и французский формат телефона тоже не принимается."],
    ["Проект не запускается командой из README.","Версии зависимостей не зафиксированы, и две из них переросли версию Node, указанную в конфигурации запуска."]
  ],
  vcells:[["tc","тест-кейсов в наборе"],["exec","выполнено на стенде"],["crit","критических дефектов"],["major","существенных"],["minor","незначительных"],["ok","проверок без замечаний"]],
  s_scope:"Что тестировалось", s_tech:"Техники тест-дизайна", s_def:"Подтверждённые дефекты",
  s_suite:"Тест-кейсы", s_matrix:"Матрица трассируемости", s_auto:"Что автоматизировать в первую очередь",
  scope:[
    "Продукт — одна страница регистрации на французском языке и один метод REST, который пишет пользователя в Postgres. Функциональность маленькая, поэтому исчерпывающий набор реалистичен: покрыты все семь полей формы, все ветки серверной валидации, слой данных и инфраструктура запуска.",
    "Ключевая особенность продукта, вокруг которой построена значительная часть набора: валидация задублирована на двух слоях независимыми регулярными выражениями, которые не совпадают. Из-за этого самые результативные кейсы — не «поле отклоняет мусор», а «клиент и сервер расходятся в том, что считать валидным». Такие кейсы вынесены в отдельную область сквозных сценариев.",
    "За пределами набора осознанно оставлено: нагрузочное тестирование сверх проверки отсутствия ограничителя частоты, тестирование на реальных устройствах, аудит зависимостей на известные уязвимости и проверка на живых движках Safari и Firefox — часть кросс-браузерных выводов получена подменой user agent, о чём сказано в соответствующем кейсе."
  ],
  techIntro:"Техника выбиралась под тип поля, а не применялась подряд. Ограничения длины разбирались граничными значениями, наборы допустимых символов — эквивалентными классами, зависимость «поле × поле × состояние» — таблицей решений и переходами состояний, а всё, что касается расхождения слоёв и утечек, — предугадыванием ошибок.",
  techHead:["Код","Техника","Где применена и что именно она поймала","Кейсов"],
  defNote:"Каждый дефект атомарен: одна причина — одно исправление. Все воспроизведены на запущенном стенде, в блоке «Фактический результат» приведён дословный ответ системы.",
  suiteNote:"Кейс раскрывается кликом: внутри предусловие, шаги, ожидаемый и фактический результат. Кнопки прогона ведут вашу собственную отметку и сохраняются между открытиями страницы.",
  matrixIntro:"Слева — область продукта, справа — чем она покрыта и сколько дефектов в ней найдено. Пустых строк нет: каждая область дала хотя бы один кейс с результатом.",
  matrixHead:["Область","Техники","Кейсов","Дефектов","Крит."],
  auto:[
    ["Контракт API, слой Jest и supertest",["Таблица «тело запроса → ожидаемый код ответа» для всех кейсов области API. Дешевле всего и ловит регрессии валидации мгновенно.","Отдельный тест на подмену идентификатора: отправить существующий id и убедиться, что строка не изменилась.","Проверка, что пароль не возвращается в ответе и не попадает в журнал."]],
    ["Согласованность слоёв, property-based",["Генератор паролей, прогоняющий одну строку через оба регулярных выражения и падающий на любом расхождении. Это единственная защита от повторения DEF-05.","То же для имени, телефона и адреса почты: клиентский и серверный предикаты обязаны совпадать."]],
    ["Сквозные сценарии, Playwright",["Счастливый путь до строки в базе — сейчас его нет вообще.","Негативный путь: сервер отвечает 400, экран успеха показываться не должен. Мокается перехватом маршрута.","Двойной клик по кнопке отправки создаёт ровно одну запись.","Скриншотный тест на ширине 375 пикселей — ловит DEF-14 без ручного глаза."]],
    ["Статические проверки в конвейере",["Линтер без флага исправления, чтобы падение было видно, а не молча правилось.","Коммит lock-файлов и сборка на зафиксированной версии Node — иначе проект снова перестанет собираться.","axe-core на странице формы: семь полей без единого label отлавливаются одним прогоном."]]
  ],
  footer:"Набор составлен по коммиту 8eedbff и прогнан на локальном стенде Docker. Отметки в разделе «Ваш прогон» видны только вам и не влияют на содержимое кейсов.",
  pass:"прошёл", fail:"упал", block:"блокирован",
  legend:["прошли","упали","блокированы","ждут"],
  cPre:"Предусловие", cSteps:"Шаги", cExp:"Ожидаемый результат", cAct:"Фактический результат", cDef:"Связанный дефект",
  dDesc:"Описание и влияние", dSteps:"Шаги воспроизведения", dAct:"Фактический результат", dExp:"Ожидаемый результат", dFix:"Как починить", dCode:"Локализация по коду", dCases:"Покрывающие кейсы",
  sevN:{crit:"критический",major:"существенный",minor:"незначительный"},
  stN:{bug:"дефект",ok:"ок",todo:"не выполнялся"},
  stFull:{bug:"дефект",ok:"соответствует",todo:"не выполнялся"},
  emptyMsg:"Под текущие фильтры не попал ни один кейс.",
  casesWord:"кейсов", withBug:"с дефектом", techWord:"техник",
  countDef:(n,c,m,mi)=>`${n} · ${c} критических · ${m} существенных · ${mi} незначительных`,
  countSuite:(n,e)=>`${n} кейсов · ${e} выполнено · ${n-e} подготовлено`
},
en:{
  tools:"Sections and filters", nav:"Sections", run:"Your run", filters:"Case filters", fpri:"Priority", fstat:"Check result", farea:"Area",
  search:"Search the cases…",
  src:"Test assignment · rndx2-public / wiregate-test-task · 8eedbff",
  h1:"Wiregate QA Dossier",
  lede:["A registration form on React, NestJS and Postgres, taken apart with test design. ","%TC% test cases"," and ","%DEF% defects",", each confirmed against a running stack: every defect carries the system's actual response rather than a guess."],
  meta:[["Stack","Docker Compose, local"],["Frontend","React 18 · CRA 5 · react-hook-form"],["Backend","NestJS 8 · TypeORM 0.2 · Postgres 13"],["Entry point","POST /users/create"],["Browser","Chromium 1280×900 and 375×812"]],
  tldrH:"The thirty-second summary",
  tldrSub:"everything below is the same story in detail",
  tldrIntro:"The assignment is a French-language registration form and a single server method. The project was deployed locally, walked through by hand and through the API, and every defect was reproduced. What follows is what breaks the product for its users or for the business.",
  tldrLines:[
    ["The user is thanked for registering even when the registration failed.","The server answers with an error, or is down entirely, and the success screen appears anyway while no account exists."],
    ["Another user's account can be overwritten with a single request.","Adding an existing user's identifier to the registration body replaces their data, and the response is still 201 Created."],
    ["Passwords sit in clear text in the database and in the log.","Debug output is on by default, so passwords leak into the logs of every environment started from the project's own instructions."],
    ["The form turns away the very audience it was built for.","The interface is French, yet François and Amélie cannot be entered and the French phone format is rejected."],
    ["The project does not start with the command in the README.","Dependency versions are unpinned and two of them have outgrown the Node version named in the run configuration."]
  ],
  vcells:[["tc","test cases in the suite"],["exec","executed against the stack"],["crit","critical defects"],["major","major"],["minor","minor"],["ok","checks with no findings"]],
  s_scope:"What was tested", s_tech:"Test design techniques", s_def:"Confirmed defects",
  s_suite:"Test cases", s_matrix:"Traceability matrix", s_auto:"What to automate first",
  scope:[
    "The product is a single French-language registration page and one REST method that writes a user into Postgres. The functionality is small, so an exhaustive suite is realistic: all seven form fields, every branch of server-side validation, the data layer and the run infrastructure are covered.",
    "The defining property of this product, and the axis much of the suite is built around, is that validation is duplicated across two layers by independent regular expressions that do not agree. The most productive cases are therefore not “the field rejects junk” but “the client and the server disagree about what counts as valid”. Those cases live in a dedicated end-to-end area.",
    "Deliberately left outside the suite: load testing beyond confirming the absence of a rate limiter, testing on physical devices, dependency auditing for known vulnerabilities, and verification on live Safari and Firefox engines — some cross-browser conclusions were reached by spoofing the user agent, which the relevant case states explicitly."
  ],
  techIntro:"The technique was chosen to fit the field rather than applied across the board. Length constraints were probed with boundary values, accepted character sets with equivalence classes, the field-by-field-by-state dependencies with a decision table and state transitions, and everything touching layer divergence and leakage with error guessing.",
  techHead:["Code","Technique","Where it was applied and what it caught","Cases"],
  defNote:"Every defect is atomic: one cause, one fix. All of them were reproduced against a running stack, and the actual-result block quotes the system's response verbatim.",
  suiteNote:"Click a case to expand it: precondition, steps, expected and actual result. The run buttons record your own pass and are remembered between visits.",
  matrixIntro:"Product area on the left; what covers it and how many defects it holds on the right. There are no empty rows: every area produced at least one case with a result.",
  matrixHead:["Area","Techniques","Cases","Defects","Critical"],
  auto:[
    ["API contract, Jest and supertest",["A table of request body against expected response code covering every case in the API area. It is the cheapest layer and catches validation regressions instantly.","A dedicated test for identifier injection: send an existing id and assert the row did not change.","An assertion that the password is neither returned in the response nor written to the log."]],
    ["Layer agreement, property-based",["A password generator that runs one string through both regular expressions and fails on any disagreement. This is the only guard against DEF-05 coming back.","The same for name, phone and email: the client and server predicates must agree."]],
    ["End-to-end, Playwright",["The happy path down to a database row — there is none today.","The negative path: the server answers 400 and the success screen must not appear. Mocked by intercepting the route.","A double click on submit creates exactly one record.","A screenshot test at 375 pixels — it catches DEF-14 without a human eye."]],
    ["Static checks in the pipeline",["The linter without its fix flag, so a failure is visible instead of silently corrected.","Committed lock files and a build on a pinned Node version — otherwise the project breaks again.","axe-core on the form page: seven fields without a single label are caught in one run."]]
  ],
  footer:"The suite was written against commit 8eedbff and executed on a local Docker stack. Marks in the “Your run” section are visible only to you and do not change the content of the cases.",
  pass:"passed", fail:"failed", block:"blocked",
  legend:["passed","failed","blocked","pending"],
  cPre:"Precondition", cSteps:"Steps", cExp:"Expected result", cAct:"Actual result", cDef:"Related defect",
  dDesc:"Description and impact", dSteps:"Steps to reproduce", dAct:"Actual result", dExp:"Expected result", dFix:"How to fix", dCode:"Location in the code", dCases:"Covering cases",
  sevN:{crit:"critical",major:"major",minor:"minor"},
  stN:{bug:"defect",ok:"ok",todo:"not run"},
  stFull:{bug:"defect",ok:"conforms",todo:"not run"},
  emptyMsg:"No case matches the current filters.",
  casesWord:"cases", withBug:"with a defect", techWord:"techniques",
  countDef:(n,c,m,mi)=>`${n} · ${c} critical · ${m} major · ${mi} minor`,
  countSuite:(n,e)=>`${n} cases · ${e} executed · ${n-e} prepared`
}};

if (typeof window !== 'undefined') { window.AREAS = AREAS; window.TECHS = TECHS; window.I18N = I18N; }
if (typeof module !== 'undefined') { module.exports = { AREAS, TECHS, I18N }; }
