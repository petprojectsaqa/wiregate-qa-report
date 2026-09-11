/* Тест-кейсы. a область · t техника · p приоритет · s результат проверки · b связанный дефект
   s: bug — проверка выявила дефект, ok — система ведёт себя корректно, todo — кейс подготовлен, не выполнялся */
window.CASES = [

/* ───────── Имя ───────── */
{id:"TC-FV-001",a:"fe-val",t:"EP",p:"P1",s:"ok",
 ru:{n:"Имя латиницей нормальной длины принимается",pre:"Форма открыта",st:["Ввести Jean в поле Votre prenom"],e:"Поле принято, ошибки нет",r:"Ошибка не показана"},
 en:{n:"A Latin-script name of ordinary length is accepted",pre:"The form is open",st:["Type Jean into the Votre prenom field"],e:"The field is accepted with no error",r:"No error is shown"}},

{id:"TC-FV-002",a:"fe-val",t:"BVA",p:"P1",s:"bug",b:"DEF-37",
 ru:{n:"Имя из трёх символов — реальное французское имя",pre:"Форма открыта",st:["Ввести Luc"],e:"Имя принято: три символа — валидное имя",r:"«First Name must be at least 4 characters»"},
 en:{n:"A three-character name, a real French given name",pre:"The form is open",st:["Type Luc"],e:"The name is accepted: three characters is a valid name",r:"“First Name must be at least 4 characters”"}},

{id:"TC-FV-003",a:"fe-val",t:"BVA",p:"P2",s:"ok",
 ru:{n:"Имя ровно на нижней границе — четыре символа",pre:"Форма открыта",st:["Ввести Jean"],e:"Принято",r:"Принято"},
 en:{n:"A name exactly on the lower boundary — four characters",pre:"The form is open",st:["Type Jean"],e:"Accepted",r:"Accepted"}},

{id:"TC-FV-004",a:"fe-val",t:"BVA",p:"P2",s:"bug",b:"DEF-35",
 ru:{n:"Имя ровно на верхней границе — 28 символов",pre:"Форма открыта в Chrome",st:["Ввести строку из 28 латинских букв"],e:"Принято, и текст сообщения о лимите согласован с фактической границей",r:"Принято, но сообщение при 29 символах гласит «less than 28»"},
 en:{n:"A name exactly on the upper boundary — 28 characters",pre:"The form is open in Chrome",st:["Type a string of 28 Latin letters"],e:"Accepted, and the limit message agrees with the actual boundary",r:"Accepted, but at 29 characters the message reads “less than 28”"}},

{id:"TC-FV-005",a:"fe-val",t:"BVA",p:"P2",s:"ok",
 ru:{n:"Имя на символ выше границы — 29 символов",pre:"Форма открыта в Chrome",st:["Ввести строку из 29 латинских букв"],e:"Отклонено",r:"Отклонено"},
 en:{n:"A name one character past the boundary — 29 characters",pre:"The form is open in Chrome",st:["Type a string of 29 Latin letters"],e:"Rejected",r:"Rejected"}},

{id:"TC-FV-006",a:"fe-val",t:"CMP",p:"P1",s:"bug",b:"DEF-13",
 ru:{n:"Лимит длины имени различается между браузерами",pre:"Форма открыта",st:["Ввести имя из 30 символов в Chrome","Подменить user agent на Firefox и повторить ввод"],e:"Одинаковое поведение в обоих браузерах",r:"Chrome отклоняет, при user agent Firefox те же 30 символов принимаются"},
 en:{n:"The name length limit differs between browsers",pre:"The form is open",st:["Type a 30-character name in Chrome","Spoof the user agent as Firefox and retype the same value"],e:"Identical behaviour in both browsers",r:"Chrome rejects it; with a Firefox user agent the same 30 characters are accepted"}},

{id:"TC-FV-007",a:"fe-val",t:"EP",p:"P1",s:"bug",b:"DEF-11",
 ru:{n:"Имя с французской диакритикой",pre:"Форма открыта",st:["Ввести François","Ввести Amélie"],e:"Приняты: интерфейс французский",r:"Оба отклонены с «Please enter a valid first name»"},
 en:{n:"A name with French diacritics",pre:"The form is open",st:["Type François","Type Amélie"],e:"Both accepted: the interface is French",r:"Both rejected with “Please enter a valid first name”"}},

{id:"TC-FV-008",a:"fe-val",t:"EP",p:"P2",s:"bug",b:"DEF-11",
 ru:{n:"Имя нелатинским алфавитом",pre:"Форма открыта",st:["Ввести Жанна в форму","Отправить то же значение напрямую в API"],e:"Решение о поддержке нелатиницы принято осознанно и одинаково на обоих слоях",r:"Фронт отклоняет, сервер такое же значение принимает и сохраняет"},
 en:{n:"A name in a non-Latin script",pre:"The form is open",st:["Type Жанна into the form","Send the same value directly to the API"],e:"Support for non-Latin scripts is a deliberate decision applied identically on both layers",r:"The form rejects it; the server accepts and stores the same value"}},

{id:"TC-FV-009",a:"fe-val",t:"EP",p:"P2",s:"ok",
 ru:{n:"Имя с цифрами",pre:"Форма открыта",st:["Ввести Jean2"],e:"Отклонено",r:"Отклонено"},
 en:{n:"A name containing digits",pre:"The form is open",st:["Type Jean2"],e:"Rejected",r:"Rejected"}},

{id:"TC-FV-010",a:"fe-val",t:"EP",p:"P2",s:"ok",
 ru:{n:"Имя с дефисом и апострофом",pre:"Форма открыта",st:["Ввести Jean-Paul","Ввести O'Brien"],e:"Приняты",r:"Приняты"},
 en:{n:"A name with a hyphen and an apostrophe",pre:"The form is open",st:["Type Jean-Paul","Type O'Brien"],e:"Both accepted",r:"Both accepted"}},

{id:"TC-FV-011",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-41",
 ru:{n:"Имя из одних пробелов",pre:"Форма открыта",st:["Ввести четыре пробела в поле имени","Отправить то же значение в API"],e:"Отклонено как пустое значение",r:"Принято формой; сервер на такое значение отвечает 201"},
 en:{n:"A name consisting only of spaces",pre:"The form is open",st:["Type four spaces into the name field","Send the same value to the API"],e:"Rejected as an empty value",r:"Accepted by the form; the server answers 201 for the same value"}},

{id:"TC-FV-012",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-40",
 ru:{n:"Пробелы по краям имени не обрезаются",pre:"Форма открыта",st:["Ввести «   Jean   »"],e:"Значение обрезается перед отправкой",r:"Принято и уходит на сервер с пробелами"},
 en:{n:"Spaces around a name are not trimmed",pre:"The form is open",st:["Type “   Jean   ”"],e:"The value is trimmed before submission",r:"Accepted and sent to the server with its spaces"}},

{id:"TC-FV-013",a:"fe-val",t:"EG",p:"P3",s:"bug",b:"DEF-15",
 ru:{n:"Имя из эмодзи",pre:"Форма открыта",st:["Вставить эмодзи в поле имени","Отправить то же значение в API"],e:"Отклонено на обоих слоях",r:"Фронт отклоняет, сервер принимает и сохраняет"},
 en:{n:"A name made of emoji",pre:"The form is open",st:["Paste emoji into the name field","Send the same value to the API"],e:"Rejected on both layers",r:"The form rejects it; the server accepts and stores it"}},

{id:"TC-FV-014",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-54",
 ru:{n:"Вставка длинного значения из буфера обмена",pre:"В буфере строка длиннее лимита",st:["Вставить строку в поле имени сочетанием клавиш"],e:"Ввод ограничен на уровне поля либо сразу показана ошибка",r:"Атрибут maxlength отсутствует, ограничение узнаётся только из сообщения"},
 en:{n:"Pasting an over-long value from the clipboard",pre:"The clipboard holds a string longer than the limit",st:["Paste the string into the name field with a keyboard shortcut"],e:"Input is capped at the field level, or an error appears immediately",r:"There is no maxlength attribute; the limit is discovered only from the message"}},

/* ───────── Фамилия ───────── */
{id:"TC-FV-020",a:"fe-val",t:"EG",p:"P1",s:"bug",b:"DEF-36",
 ru:{n:"Текст ошибки поля фамилии",pre:"Форма открыта",st:["Ввести в поле Votre nom значение с недопустимым символом"],e:"Сообщение относится к фамилии",r:"«Please enter a valid first name»"},
 en:{n:"The error text of the last-name field",pre:"The form is open",st:["Type a value with a disallowed character into the Votre nom field"],e:"The message refers to the last name",r:"“Please enter a valid first name”"}},

{id:"TC-FV-021",a:"fe-val",t:"BVA",p:"P2",s:"bug",b:"DEF-35",
 ru:{n:"Границы длины фамилии 4 и 28",pre:"Форма открыта",st:["Ввести 3, 4, 28 и 29 символов"],e:"Отклонено, принято, принято, отклонено",r:"Границы отрабатывают; тексты смещены на единицу, как в TC-FV-004"},
 en:{n:"Last-name length boundaries at 4 and 28",pre:"The form is open",st:["Type 3, then 4, then 28, then 29 characters"],e:"Rejected, accepted, accepted, rejected",r:"The boundaries hold; the texts are off by one, as in TC-FV-004"}},

{id:"TC-FV-022",a:"fe-val",t:"CMP",p:"P3",s:"bug",b:"DEF-13",
 ru:{n:"Асимметрия лимитов имени и фамилии",pre:"Форма открыта в не-Chrome браузере",st:["Ввести 30 символов в имя","Ввести 30 символов в фамилию"],e:"Оба поля ведут себя одинаково",r:"Имя принимает 30 символов, фамилия отклоняет: ветка по user agent есть только у имени"},
 en:{n:"Asymmetric limits between first and last name",pre:"The form is open in a non-Chrome browser",st:["Type 30 characters into the first name","Type 30 characters into the last name"],e:"Both fields behave identically",r:"The first name accepts 30 characters, the last name rejects them: only the first name branches on the user agent"}},

/* ───────── Телефон ───────── */
{id:"TC-FV-030",a:"fe-val",t:"BVA",p:"P1",s:"ok",
 ru:{n:"Телефон на символ ниже границы — 7 цифр",pre:"Форма открыта заново, Backspace в поле не нажимался",st:["Ввести 1234567"],e:"Отклонено",r:"«Phone Number must be at least 8 characters»"},
 en:{n:"A phone number one digit below the boundary — 7 digits",pre:"The form has been reloaded and Backspace has not been pressed in the field",st:["Type 1234567"],e:"Rejected",r:"“Phone Number must be at least 8 characters”"}},

{id:"TC-FV-031",a:"fe-val",t:"BVA",p:"P1",s:"ok",
 ru:{n:"Телефон ровно на нижней границе — 8 цифр",pre:"Форма открыта заново, Backspace в поле не нажимался",st:["Ввести 12345678"],e:"Принято",r:"Принято"},
 en:{n:"A phone number exactly on the lower boundary — 8 digits",pre:"The form has been reloaded and Backspace has not been pressed in the field",st:["Type 12345678"],e:"Accepted",r:"Accepted"}},

{id:"TC-FV-032",a:"fe-val",t:"BVA",p:"P2",s:"bug",b:"DEF-35",
 ru:{n:"Телефон на верхней границе — 16 и 17 цифр",pre:"Форма открыта",st:["Ввести 16 цифр","Ввести 17 цифр"],e:"Принято, затем отклонено, текст сообщения согласован с границей",r:"Принято и отклонено; текст снова смещён на единицу"},
 en:{n:"A phone number at the upper boundary — 16 and 17 digits",pre:"The form is open",st:["Type 16 digits","Type 17 digits"],e:"Accepted, then rejected, with the message matching the boundary",r:"Accepted then rejected; the text is again off by one"}},

{id:"TC-FV-033",a:"fe-val",t:"STT",p:"P0",s:"bug",b:"DEF-07",
 ru:{n:"Backspace необратимо снимает минимальную длину телефона",pre:"Форма открыта заново",st:["Ввести две цифры — появится ошибка минимальной длины","Нажать Backspace","Ввести ещё одну цифру"],e:"Ошибка минимальной длины сохраняется, пока цифр меньше восьми",r:"При значении 121 ошибка исчезает: minLength сброшен в 0 и больше не восстанавливается"},
 en:{n:"Backspace irreversibly removes the phone minimum length",pre:"The form has been reloaded",st:["Type two digits — the minimum-length error appears","Press Backspace","Type one more digit"],e:"The minimum-length error stays while there are fewer than eight digits",r:"At the value 121 the error disappears: minLength was reset to 0 and never restored"}},

{id:"TC-FV-034",a:"fe-val",t:"EP",p:"P1",s:"bug",b:"DEF-12",
 ru:{n:"Телефон в международном формате",pre:"Форма открыта",st:["Ввести +33612345678"],e:"Принято или нормализовано",r:"Отклонено с сообщением «Ce champ est requis» — поле заполнено, а сообщение говорит об обязательности"},
 en:{n:"A phone number in international format",pre:"The form is open",st:["Type +33612345678"],e:"Accepted or normalised",r:"Rejected with “Ce champ est requis” — the field is filled in, yet the message claims it is required"}},

{id:"TC-FV-035",a:"fe-val",t:"EP",p:"P1",s:"bug",b:"DEF-12",
 ru:{n:"Телефон в национальном французском формате с пробелами",pre:"Форма открыта",st:["Ввести 06 12 34 56 78"],e:"Принято или нормализовано",r:"Отклонено с тем же неверным сообщением"},
 en:{n:"A phone number in the national French format with spaces",pre:"The form is open",st:["Type 06 12 34 56 78"],e:"Accepted or normalised",r:"Rejected with the same incorrect message"}},

{id:"TC-FV-036",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-16",
 ru:{n:"Телефон из одних нулей",pre:"Форма открыта",st:["Ввести 000000000"],e:"Отклонено как заведомо не номер либо принято осознанно",r:"Принято: содержательной проверки номера нет ни на одном слое"},
 en:{n:"A phone number of nothing but zeroes",pre:"The form is open",st:["Type 000000000"],e:"Rejected as obviously not a number, or accepted deliberately",r:"Accepted: neither layer performs a meaningful number check"}},

{id:"TC-FV-037",a:"fe-val",t:"EG",p:"P3",s:"ok",
 ru:{n:"Телефон арабо-индийскими цифрами",pre:"Форма открыта",st:["Ввести ١٢٣٤٥٦٧٨"],e:"Отклонено",r:"Отклонено"},
 en:{n:"A phone number in Arabic-Indic digits",pre:"The form is open",st:["Type ١٢٣٤٥٦٧٨"],e:"Rejected",r:"Rejected"}},

{id:"TC-FV-038",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-53",
 ru:{n:"Тип поля телефона на мобильном устройстве",pre:"Форма открыта при ширине 375 px",st:["Коснуться поля телефона"],e:"Открывается цифровая клавиатура",r:"Тип поля text вместо tel — обычная клавиатура"},
 en:{n:"The phone field type on a mobile device",pre:"The form is open at a width of 375 px",st:["Tap the phone field"],e:"The numeric keyboard opens",r:"The field type is text instead of tel, so the standard keyboard opens"}},

/* ───────── Почта ───────── */
{id:"TC-FV-039",a:"fe-val",t:"EG",p:"P1",s:"bug",b:"DEF-39",
 ru:{n:"Текст ошибки при неверном формате телефона",pre:"Форма открыта",st:["Ввести +33612345678 в поле Numéro de téléphone","Прочитать текст ошибки под полем"],e:"Сообщение описывает требуемый формат номера",r:"«Ce champ est requis» — сообщение об обязательности при заполненном поле"},
 en:{n:"The error text for an invalid phone format",pre:"The form is open",st:["Type +33612345678 into the Numéro de téléphone field","Read the error text below the field"],e:"The message describes the expected number format",r:"“Ce champ est requis” — a required-field message on a field that is filled in"}},

{id:"TC-FV-040",a:"fe-val",t:"EP",p:"P1",s:"ok",
 ru:{n:"Корректный адрес электронной почты",pre:"Форма открыта",st:["Ввести a@b.co","Ввести jean.dupont@mail.example.co.uk"],e:"Оба приняты",r:"Оба приняты"},
 en:{n:"A valid email address",pre:"The form is open",st:["Type a@b.co","Type jean.dupont@mail.example.co.uk"],e:"Both accepted",r:"Both accepted"}},

{id:"TC-FV-041",a:"fe-val",t:"EP",p:"P1",s:"ok",
 ru:{n:"Адрес без доменной зоны",pre:"Форма открыта",st:["Ввести a@b"],e:"Отклонено",r:"Отклонено"},
 en:{n:"An address with no top-level domain",pre:"The form is open",st:["Type a@b"],e:"Rejected",r:"Rejected"}},

{id:"TC-FV-042",a:"fe-val",t:"BVA",p:"P2",s:"ok",
 ru:{n:"Доменная зона из одного символа",pre:"Форма открыта",st:["Ввести a@b.c"],e:"Отклонено",r:"Отклонено"},
 en:{n:"A one-character top-level domain",pre:"The form is open",st:["Type a@b.c"],e:"Rejected",r:"Rejected"}},

{id:"TC-FV-043",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-76",
 ru:{n:"Домен, начинающийся с дефиса",pre:"Форма открыта",st:["Ввести a@-b.co"],e:"Отклонено: такой домен не существует",r:"Принято обоими слоями"},
 en:{n:"A domain beginning with a hyphen",pre:"The form is open",st:["Type a@-b.co"],e:"Rejected: such a domain cannot exist",r:"Accepted by both layers"}},

{id:"TC-FV-044",a:"fe-val",t:"EG",p:"P3",s:"bug",b:"DEF-76",
 ru:{n:"Адрес с IP-литералом в домене",pre:"Форма открыта",st:["Ввести a@[127.0.0.1]"],e:"Отклонено для пользовательской формы",r:"Принято обоими слоями"},
 en:{n:"An address with an IP literal as the domain",pre:"The form is open",st:["Type a@[127.0.0.1]"],e:"Rejected for a consumer form",r:"Accepted by both layers"}},

{id:"TC-FV-045",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-40",
 ru:{n:"Адрес с пробелом в конце — типичная вставка из буфера",pre:"Форма открыта",st:["Вставить «a@b.co » с пробелом на конце"],e:"Пробел обрезается, адрес принимается",r:"Отклонено — пользователь не видит причины"},
 en:{n:"An address with a trailing space, the typical paste case",pre:"The form is open",st:["Paste “a@b.co ” with a trailing space"],e:"The space is trimmed and the address is accepted",r:"Rejected, and the user cannot see why"}},

{id:"TC-FV-046",a:"fe-val",t:"EP",p:"P2",s:"bug",b:"DEF-11",
 ru:{n:"Интернационализированный адрес",pre:"Форма открыта",st:["Ввести жан@почта.рф"],e:"Поведение определено и одинаково на обоих слоях",r:"Отклонено фронтом, серверное выражение тоже не пропускает — расхождения нет, но поддержки нет"},
 en:{n:"An internationalised address",pre:"The form is open",st:["Type жан@почта.рф"],e:"Behaviour is defined and identical on both layers",r:"Rejected by the form, and the server expression rejects it too — no mismatch, but no support either"}},

{id:"TC-FV-047",a:"fe-val",t:"EP",p:"P2",s:"bug",b:"DEF-09",
 ru:{n:"Адрес в верхнем регистре как дубликат существующего",pre:"Пользователь a@b.co уже зарегистрирован",st:["Зарегистрировать A@B.CO"],e:"Адрес приводится к нижнему регистру и отклоняется как дубликат",r:"Принят: нормализации нет, уникальности нет"},
 en:{n:"An upper-case address duplicating an existing one",pre:"The user a@b.co is already registered",st:["Register A@B.CO"],e:"The address is lower-cased and rejected as a duplicate",r:"Accepted: there is no normalisation and no uniqueness"}},

{id:"TC-FV-048",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-53",
 ru:{n:"Тип поля адреса",pre:"Форма открыта",st:["Проверить атрибут type поля Votre email"],e:"type равен email",r:"type равен text"},
 en:{n:"The email field type",pre:"The form is open",st:["Inspect the type attribute of the Votre email field"],e:"type is email",r:"type is text"}},

/* ───────── Пароль ───────── */
{id:"TC-FV-050",a:"fe-val",t:"BVA",p:"P1",s:"ok",
 ru:{n:"Пароль на нижней границе длины",pre:"Форма открыта",st:["Ввести Abcdef1 — семь символов","Ввести Abcdef1! — восемь символов"],e:"Отклонено, затем принято",r:"Отклонено, затем принято"},
 en:{n:"A password at the lower length boundary",pre:"The form is open",st:["Type Abcdef1 — seven characters","Type Abcdef1! — eight characters"],e:"Rejected, then accepted",r:"Rejected, then accepted"}},

{id:"TC-FV-051",a:"fe-val",t:"BVA",p:"P1",s:"bug",b:"DEF-17",
 ru:{n:"Пароль на верхней границе длины",pre:"Форма открыта",st:["Ввести 28 символов","Ввести 29 символов","Отправить пароль из 1000 символов напрямую в API"],e:"Принято, затем отклонено, и та же граница действует на сервере",r:"На фронте граница работает; сервер принимает пароль из 1000 символов"},
 en:{n:"A password at the upper length boundary",pre:"The form is open",st:["Type 28 characters","Type 29 characters","Send a 1000-character password directly to the API"],e:"Accepted, then rejected, with the same boundary enforced server-side",r:"The form enforces the boundary; the server accepts a 1000-character password"}},

{id:"TC-FV-052",a:"fe-val",t:"DT",p:"P0",s:"bug",b:"DEF-05",
 ru:{n:"Пароль, валидный на фронте и невалидный на сервере",pre:"Форма открыта, сервер доступен",st:["Ввести password1 в оба поля пароля","Заполнить остальные поля валидно и отправить"],e:"Форма отвергает пароль до отправки либо показывает ошибку сервера",r:"Форма принимает, сервер отвечает 400, пользователь видит экран успеха, записи в базе нет"},
 en:{n:"A password valid on the client and invalid on the server",pre:"The form is open and the server is reachable",st:["Type password1 into both password fields","Fill the remaining fields validly and submit"],e:"The form rejects the password before submission, or surfaces the server error",r:"The form accepts it, the server answers 400, the user sees the success screen, and nothing is stored"}},

{id:"TC-FV-053",a:"fe-val",t:"EG",p:"P1",s:"bug",b:"DEF-34",
 ru:{n:"Пароль без строчных букв при сообщении, требующем строчные",pre:"Форма открыта",st:["Ввести строку из 27 заглавных букв и цифры"],e:"Поведение соответствует тексту сообщения",r:"Принято, хотя сообщение требует строчную букву"},
 en:{n:"A password with no lower-case letters, against a message demanding them",pre:"The form is open",st:["Type 27 upper-case letters followed by a digit"],e:"Behaviour matches the message text",r:"Accepted, even though the message demands a lower-case letter"}},

{id:"TC-FV-054",a:"fe-val",t:"DT",p:"P1",s:"bug",b:"DEF-05",
 ru:{n:"Пароль, невалидный на фронте и валидный на сервере",pre:"Форма открыта",st:["Ввести Abcdef1^ в поле пароля","Отправить то же значение напрямую в API"],e:"Наборы допустимых спецсимволов совпадают на обоих слоях",r:"Фронт отклоняет; тот же пароль через API принимается с кодом 201"},
 en:{n:"A password invalid on the client and valid on the server",pre:"The form is open",st:["Type Abcdef1^ into the password field","Send the same value directly to the API"],e:"The accepted special-character sets match on both layers",r:"The form rejects it; the same password is accepted by the API with 201"}},

{id:"TC-FV-055",a:"fe-val",t:"EP",p:"P2",s:"bug",b:"DEF-34",
 ru:{n:"Пароль с пробелом",pre:"Форма открыта",st:["Ввести Abcdef1 2"],e:"Поведение определено и описано в сообщении",r:"Отклонено, но сообщение о пробелах не говорит"},
 en:{n:"A password containing a space",pre:"The form is open",st:["Type Abcdef1 2"],e:"Behaviour is defined and explained by the message",r:"Rejected, but the message says nothing about spaces"}},

{id:"TC-FV-056",a:"fe-val",t:"EP",p:"P2",s:"bug",b:"DEF-34",
 ru:{n:"Пароль с нелатинскими символами",pre:"Форма открыта",st:["Ввести Пароль123","Ввести Abcdef1é"],e:"Парольные фразы на родном языке поддерживаются",r:"Оба отклонены: набор символов ограничен латиницей и восемью спецсимволами"},
 en:{n:"A password with non-Latin characters",pre:"The form is open",st:["Type Пароль123","Type Abcdef1é"],e:"Passphrases in the user's own language are supported",r:"Both rejected: the character set is limited to Latin letters and eight special characters"}},

{id:"TC-FV-057",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-34",
 ru:{n:"Сообщение не упоминает требование спецсимвола",pre:"Форма открыта",st:["Ввести Abcdef12 — пароль без спецсимвола","Отправить форму"],e:"Пользователю сказано, что нужен спецсимвол",r:"Фронт принимает, сервер отвечает 400, требование спецсимвола нигде не показано"},
 en:{n:"The message never mentions the special-character requirement",pre:"The form is open",st:["Type Abcdef12 — a password with no special character","Submit the form"],e:"The user is told a special character is required",r:"The form accepts it, the server answers 400, and the requirement is shown nowhere"}},

{id:"TC-FV-058",a:"fe-val",t:"EXP",p:"P3",s:"ok",
 ru:{n:"Переключатель видимости пароля мышью",pre:"В поле пароля введено значение",st:["Нажать на иконку глаза","Нажать ещё раз"],e:"Пароль показывается и снова скрывается",r:"Работает по клику мышью"},
 en:{n:"The password visibility toggle with a mouse",pre:"The password field holds a value",st:["Click the eye icon","Click it again"],e:"The password is revealed and hidden again",r:"Works on a mouse click"}},

{id:"TC-FV-059",a:"fe-val",t:"SEC",p:"P2",s:"bug",b:"DEF-34",
 ru:{n:"Слабый, но формально валидный пароль",pre:"Форма открыта",st:["Ввести Abcdef1! — пароль из верхушки словарей утечек"],e:"Показано предупреждение о слабости либо пароль отклонён",r:"Принят без замечаний; индикатора надёжности нет"},
 en:{n:"A weak but formally valid password",pre:"The form is open",st:["Type Abcdef1! — a password near the top of breach dictionaries"],e:"A strength warning is shown, or the password is rejected",r:"Accepted without comment; there is no strength indicator"}},

{id:"TC-FV-060",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-49",
 ru:{n:"Работа менеджера паролей",pre:"В браузере включён менеджер паролей",st:["Открыть форму и попытаться сгенерировать пароль"],e:"Менеджер распознаёт поле как новый пароль",r:"Атрибут autocomplete отсутствует у всех полей — распознавание не работает"},
 en:{n:"Password manager behaviour",pre:"The browser password manager is enabled",st:["Open the form and try to generate a password"],e:"The manager recognises the field as a new password",r:"No field carries an autocomplete attribute, so recognition never happens"}},

/* ───────── Подтверждение и согласие ───────── */
{id:"TC-FV-070",a:"fe-val",t:"EP",p:"P1",s:"ok",
 ru:{n:"Несовпадающее подтверждение пароля",pre:"Форма открыта",st:["Ввести разные значения в пароль и подтверждение"],e:"Показана ошибка несовпадения",r:"«The passwords do not match»"},
 en:{n:"A non-matching password confirmation",pre:"The form is open",st:["Type different values into the password and confirmation fields"],e:"A mismatch error is shown",r:"“The passwords do not match”"}},

{id:"TC-FV-071",a:"fe-val",t:"STT",p:"P1",s:"bug",b:"DEF-45",
 ru:{n:"Изменение пароля после успешного подтверждения",pre:"Оба поля пароля заполнены одинаково, форма валидна",st:["Изменить только основное поле пароля","Посмотреть на поле подтверждения и на кнопку"],e:"Появляется ошибка несовпадения",r:"Ошибка не появляется, кнопка молча становится неактивной — тупиковое состояние"},
 en:{n:"Changing the password after a successful confirmation",pre:"Both password fields hold the same value and the form is valid",st:["Edit the main password field only","Inspect the confirmation field and the button"],e:"A mismatch error appears",r:"No error appears and the button silently goes disabled — a dead end"}},

{id:"TC-FV-072",a:"fe-val",t:"EG",p:"P3",s:"bug",b:"DEF-34",
 ru:{n:"Правила поля подтверждения",pre:"Форма открыта",st:["Ввести в оба поля одинаковое значение, не удовлетворяющее набору символов пароля"],e:"Оба поля применяют одинаковый набор правил",r:"У подтверждения нет проверки по набору символов, только длина и совпадение"},
 en:{n:"The rules applied to the confirmation field",pre:"The form is open",st:["Type the same value into both fields, one that violates the password character set"],e:"Both fields apply the same set of rules",r:"The confirmation has no character-set check, only length and equality"}},

{id:"TC-FV-080",a:"fe-val",t:"DT",p:"P1",s:"ok",
 ru:{n:"Отправка без согласия с условиями",pre:"Все поля заполнены валидно",st:["Не ставить галочку согласия","Попытаться отправить"],e:"Отправка заблокирована",r:"Кнопка неактивна, отправки нет"},
 en:{n:"Submitting without accepting the terms",pre:"Every field holds a valid value",st:["Leave the consent checkbox unticked","Try to submit"],e:"Submission is blocked",r:"The button is disabled and nothing is sent"}},

{id:"TC-FV-081",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-50",
 ru:{n:"Клик по тексту согласия",pre:"Форма открыта",st:["Нажать на текст «J'ai lu et accepté…»"],e:"Чекбокс переключается",r:"Не переключается: текст не связан с полем элементом label"},
 en:{n:"Clicking the consent text",pre:"The form is open",st:["Click the text “J'ai lu et accepté…”"],e:"The checkbox toggles",r:"It does not: the text is not tied to the field by a label"}},

{id:"TC-FV-082",a:"fe-val",t:"EG",p:"P2",s:"bug",b:"DEF-43",
 ru:{n:"Текст ошибки у чекбокса согласия",pre:"Форма заполнена, галочка не стоит",st:["Вызвать валидацию чекбокса"],e:"Показано объяснение, почему форма не отправляется",r:"Блок ошибки пуст: правило задано без текста сообщения"},
 en:{n:"The error text on the consent checkbox",pre:"The form is filled in and the box is unticked",st:["Trigger validation on the checkbox"],e:"An explanation of why the form will not submit is shown",r:"The error block is empty: the rule carries no message"}},

{id:"TC-FV-083",a:"fe-val",t:"EXP",p:"P3",s:"bug",b:"DEF-42",
 ru:{n:"Лишняя звёздочка над чекбоксом",pre:"Форма открыта",st:["Посмотреть на область между подтверждением пароля и чекбоксом"],e:"Посторонних символов нет",r:"Одиночная красная звёздочка без подписи"},
 en:{n:"A stray asterisk above the checkbox",pre:"The form is open",st:["Look at the area between the password confirmation and the checkbox"],e:"No stray characters",r:"A lone red asterisk with no caption"}},

/* ───────── Логика формы ───────── */
{id:"TC-FF-001",a:"fe-form",t:"DT",p:"P0",s:"bug",b:"DEF-01",
 ru:{n:"Сервер отвечает ошибкой — форма показывает успех",pre:"Сервер доступен, пароль валиден на фронте и невалиден на сервере",st:["Заполнить форму паролем password1","Отправить","Посмотреть экран и таблицу users"],e:"Показана ошибка, пользователь остаётся на форме, данные сохранены",r:"POST 400, экран «Thank you for subscription!», в таблице 0 строк"},
 en:{n:"The server answers with an error and the form shows success",pre:"The server is reachable; the password is valid on the client and invalid on the server",st:["Fill the form with the password password1","Submit","Inspect the screen and the users table"],e:"An error is shown, the user stays on the form, and the data is preserved",r:"POST 400, the screen reads “Thank you for subscription!”, and the table holds 0 rows"}},

{id:"TC-FF-002",a:"fe-form",t:"DT",p:"P0",s:"bug",b:"DEF-01",
 ru:{n:"Сервер недоступен — форма показывает успех",pre:"Контейнер бэкенда остановлен",st:["Заполнить форму валидно","Отправить"],e:"Показана ошибка связи с предложением повторить",r:"ERR_CONNECTION_REFUSED в консоли, на экране успех"},
 en:{n:"The server is unreachable and the form shows success",pre:"The backend container is stopped",st:["Fill the form with valid values","Submit"],e:"A connection error is shown with an option to retry",r:"ERR_CONNECTION_REFUSED in the console, success on screen"}},

{id:"TC-FF-003",a:"fe-form",t:"EXP",p:"P0",s:"bug",b:"DEF-10",
 ru:{n:"Быстрые повторные нажатия кнопки отправки",pre:"Форма заполнена валидно, база пуста",st:["Нажать кнопку отправки три раза подряд"],e:"Создана ровно одна запись",r:"Три запроса, три ответа 201, три одинаковые строки в базе"},
 en:{n:"Rapid repeated presses of the submit button",pre:"The form is valid and the database is empty",st:["Press the submit button three times in a row"],e:"Exactly one record is created",r:"Three requests, three 201 responses, three identical rows"}},

{id:"TC-FF-004",a:"fe-form",t:"EXP",p:"P1",s:"bug",b:"DEF-10",
 ru:{n:"Индикация процесса отправки",pre:"Форма заполнена валидно",st:["Отправить форму и наблюдать за кнопкой"],e:"Кнопка переходит в состояние ожидания",r:"Состояния ожидания нет, кнопка остаётся активной до перехода на экран успеха"},
 en:{n:"Feedback while the submission is in flight",pre:"The form holds valid values",st:["Submit the form and watch the button"],e:"The button enters a pending state",r:"There is no pending state; the button stays active until the success screen appears"}},

{id:"TC-FF-005",a:"fe-form",t:"EXP",p:"P2",s:"todo",
 ru:{n:"Отправка формы клавишей Enter",pre:"Форма заполнена валидно, фокус в текстовом поле",st:["Нажать Enter"],e:"Форма отправляется, поведение совпадает с нажатием кнопки",r:""},
 en:{n:"Submitting the form with the Enter key",pre:"The form is valid and focus is in a text field",st:["Press Enter"],e:"The form submits and behaves exactly as a button press would",r:""}},

{id:"TC-FF-006",a:"fe-form",t:"EG",p:"P2",s:"todo",
 ru:{n:"Сброс формы вызывается после перехода на другой экран",pre:"Форма заполнена валидно",st:["Отправить форму","Проверить предупреждения React в консоли"],e:"Предупреждений об обновлении состояния размонтированного компонента нет",r:""},
 en:{n:"The form reset runs after navigating away",pre:"The form holds valid values",st:["Submit the form","Check the console for React warnings"],e:"No warnings about updating state on an unmounted component",r:""}},

{id:"TC-FF-007",a:"fe-form",t:"STT",p:"P2",s:"todo",
 ru:{n:"Возврат назад с экрана успеха",pre:"Форма отправлена, открыт экран успеха",st:["Нажать кнопку браузера «назад»"],e:"Пользователь возвращается на форму в осмысленном состоянии",r:""},
 en:{n:"Going back from the success screen",pre:"The form has been submitted and the success screen is open",st:["Press the browser back button"],e:"The user returns to the form in a sensible state",r:""}},

{id:"TC-FF-008",a:"fe-form",t:"EG",p:"P2",s:"todo",
 ru:{n:"Состав отправляемого тела запроса",pre:"Форма заполнена валидно",st:["Отправить форму","Посмотреть тело запроса в панели сети"],e:"Отправляются только поля, которые нужны серверу; подтверждение пароля не уходит",r:""},
 en:{n:"The contents of the submitted request body",pre:"The form holds valid values",st:["Submit the form","Inspect the request body in the network panel"],e:"Only the fields the server needs are sent; the password confirmation is not",r:""}},

{id:"TC-FF-009",a:"fe-form",t:"EG",p:"P1",s:"bug",b:"DEF-32",
 ru:{n:"Таймаут запроса не задан",pre:"Сервер принимает соединение, но не отвечает",st:["Отправить форму","Наблюдать за состоянием запроса в панели сети"],e:"Запрос прерывается по таймауту с понятным сообщением",r:"В конфигурации axios таймаут не задан — запрос висит бессрочно, а пользователь уже на экране успеха"},
 en:{n:"No request timeout is configured",pre:"The server accepts the connection but never answers",st:["Submit the form","Watch the request state in the network panel"],e:"The request aborts on a timeout with a clear message",r:"The axios configuration sets no timeout, so the request hangs indefinitely while the user is already on the success screen"}},

{id:"TC-FF-010",a:"fe-form",t:"EG",p:"P2",s:"todo",
 ru:{n:"Не задана переменная адреса API",pre:"REACT_APP_API_URL не определена",st:["Собрать и открыть фронтенд","Отправить форму"],e:"Понятная ошибка конфигурации",r:""},
 en:{n:"The API address variable is not set",pre:"REACT_APP_API_URL is undefined",st:["Build and open the frontend","Submit the form"],e:"A clear configuration error",r:""}},

{id:"TC-FF-011",a:"fe-form",t:"EXP",p:"P2",s:"bug",b:"DEF-01",
 ru:{n:"Повторная попытка после неудачной отправки",pre:"Отправка завершилась ошибкой сервера",st:["Попытаться исправить данные и отправить снова"],e:"Пользователь остаётся на форме с сохранёнными данными",r:"Пользователь уже переведён на экран успеха, данные формы сброшены — повторить попытку невозможно"},
 en:{n:"Retrying after a failed submission",pre:"The submission ended with a server error",st:["Try to correct the data and submit again"],e:"The user stays on the form with the entered data preserved",r:"The user has already been moved to the success screen and the form was reset — retrying is impossible"}},

/* ───────── Вёрстка ───────── */
{id:"TC-UI-001",a:"fe-ui",t:"BVA",p:"P1",s:"bug",b:"DEF-14",
 ru:{n:"Вёрстка при ширине 375 px",pre:"Форма открыта",st:["Установить ширину окна 375 px","Осмотреть поле Votre nom"],e:"Все поля помещаются в карточку",r:"Поле фамилии шириной 400 px выходит за пределы карточки и экрана"},
 en:{n:"Layout at a width of 375 px",pre:"The form is open",st:["Set the window width to 375 px","Inspect the Votre nom field"],e:"Every field fits inside the card",r:"The 400-px last-name field spills outside the card and off the screen"}},

{id:"TC-UI-002",a:"fe-ui",t:"BVA",p:"P2",s:"todo",
 ru:{n:"Вёрстка при ширине 320 px",pre:"Форма открыта",st:["Установить ширину окна 320 px"],e:"Горизонтальной прокрутки нет, содержимое читаемо",r:""},
 en:{n:"Layout at a width of 320 px",pre:"The form is open",st:["Set the window width to 320 px"],e:"No horizontal scrolling and the content stays readable",r:""}},

{id:"TC-UI-003",a:"fe-ui",t:"BVA",p:"P2",s:"todo",
 ru:{n:"Поведение карточки на промежуточных разрешениях",pre:"Форма открыта",st:["Проверить 768, 1024 и 1440 px"],e:"Ширина карточки меняется предсказуемо",r:""},
 en:{n:"Card behaviour at intermediate resolutions",pre:"The form is open",st:["Check 768, 1024 and 1440 px"],e:"The card width changes predictably",r:""}},

{id:"TC-UI-004",a:"fe-ui",t:"EXP",p:"P2",s:"bug",b:"DEF-44",
 ru:{n:"Внешний вид неактивной кнопки отправки",pre:"Форма пуста",st:["Осмотреть кнопку и навести на неё курсор"],e:"Неактивное состояние видно",r:"Цвет и непрозрачность совпадают с активным состоянием, эффект наведения работает"},
 en:{n:"The appearance of the disabled submit button",pre:"The form is empty",st:["Inspect the button and hover over it"],e:"The disabled state is visible",r:"Colour and opacity match the enabled state and the hover effect still works"}},

{id:"TC-UI-005",a:"fe-ui",t:"EXP",p:"P3",s:"bug",b:"DEF-60",
 ru:{n:"Класс шрифта в разметке формы",pre:"Проект собран",st:["Найти font-OpenSans в собранном CSS"],e:"Класс присутствует и задаёт семейство",r:"Класс не сгенерирован: в конфигурации Tailwind нет раздела fontFamily"},
 en:{n:"The font class used in the form markup",pre:"The project is built",st:["Search the built CSS for font-OpenSans"],e:"The class is present and sets a family",r:"The class is never generated: the Tailwind config has no fontFamily section"}},

{id:"TC-UI-006",a:"fe-ui",t:"EXP",p:"P3",s:"bug",b:"DEF-58",
 ru:{n:"Блок регистрации через соцсети",pre:"Форма открыта",st:["Поискать кнопки Google и Facebook"],e:"Либо блок отображается, либо код удалён",r:"Компонент существует, но не подключён ни к одному экрану — на странице одна кнопка"},
 en:{n:"The social sign-up block",pre:"The form is open",st:["Look for the Google and Facebook buttons"],e:"Either the block is rendered or the code is deleted",r:"The component exists but is wired into no screen — the page holds one button"}},

{id:"TC-UI-007",a:"fe-ui",t:"EXP",p:"P2",s:"bug",b:"DEF-59",
 ru:{n:"Ссылка для существующих пользователей",pre:"Форма открыта",st:["Нажать на текст «Vous avez déjà un compte?»"],e:"Переход на вход",r:"Текст не является ссылкой и никуда не ведёт"},
 en:{n:"The link for existing users",pre:"The form is open",st:["Click the text “Vous avez déjà un compte?”"],e:"Navigation to sign-in",r:"The text is not a link and leads nowhere"}},

{id:"TC-UI-008",a:"fe-ui",t:"EXP",p:"P2",s:"bug",b:"DEF-38",
 ru:{n:"Опечатка в подписи подтверждения пароля",pre:"Форма открыта",st:["Прочитать подпись шестого поля"],e:"Грамотный французский текст",r:"«Confirmez vorte mot de passe» вместо votre"},
 en:{n:"A typo in the confirm-password caption",pre:"The form is open",st:["Read the caption of the sixth field"],e:"Correct French text",r:"“Confirmez vorte mot de passe” instead of votre"}},

{id:"TC-UI-009",a:"fe-ui",t:"EXP",p:"P2",s:"bug",b:"DEF-57",
 ru:{n:"Заголовок вкладки и значок сайта",pre:"Форма открыта",st:["Посмотреть заголовок вкладки"],e:"Название продукта",r:"«React App» и стандартный значок шаблона create-react-app"},
 en:{n:"The tab title and favicon",pre:"The form is open",st:["Look at the browser tab title"],e:"The product name",r:"“React App” and the stock create-react-app icon"}},

{id:"TC-UI-010",a:"fe-ui",t:"EXP",p:"P2",s:"todo",
 ru:{n:"Индикация заполненного поля",pre:"Форма открыта",st:["Заполнить поле и не уводить фокус","Увести фокус"],e:"Состояние поля отражается сразу",r:""},
 en:{n:"Filled-field indication",pre:"The form is open",st:["Fill a field without moving focus away","Move focus away"],e:"The field state updates immediately",r:""}},

{id:"TC-UI-011",a:"fe-ui",t:"BVA",p:"P2",s:"todo",
 ru:{n:"Масштабирование страницы до 200 процентов",pre:"Форма открыта",st:["Увеличить масштаб браузера до 200 процентов"],e:"Содержимое не обрезается, поля доступны",r:""},
 en:{n:"Zooming the page to 200 percent",pre:"The form is open",st:["Zoom the browser to 200 percent"],e:"Nothing is clipped and every field stays reachable",r:""}},

{id:"TC-UI-012",a:"fe-ui",t:"EXP",p:"P3",s:"todo",
 ru:{n:"Тёмная тема операционной системы",pre:"В системе включена тёмная тема",st:["Открыть форму"],e:"Оформление осознанно поддерживает или игнорирует тему",r:""},
 en:{n:"The operating system dark theme",pre:"The system is set to dark mode",st:["Open the form"],e:"The design deliberately supports or ignores the theme",r:""}},

/* ───────── Доступность ───────── */
{id:"TC-AX-001",a:"fe-a11y",t:"SEC",p:"P1",s:"bug",b:"DEF-26",
 ru:{n:"Доступные имена полей формы",pre:"Форма открыта",st:["Проверить наличие label, id и aria-label у всех полей"],e:"У каждого поля есть доступное имя",r:"label 0, id 0, aria-label 0, placeholder ни у одного поля"},
 en:{n:"Accessible names for the form fields",pre:"The form is open",st:["Check every field for label, id and aria-label"],e:"Every field has an accessible name",r:"0 labels, 0 ids, 0 aria-labels, and no placeholder on any field"}},

{id:"TC-AX-002",a:"fe-a11y",t:"EXP",p:"P1",s:"bug",b:"DEF-48",
 ru:{n:"Прохождение формы только с клавиатуры",pre:"Форма открыта",st:["Пройти все элементы клавишей Tab","Попытаться открыть пароль с клавиатуры"],e:"Все интерактивные элементы достижимы",r:"Переключатель видимости пароля — обычный div без tabindex и role, достижимых элементов всего восемь"},
 en:{n:"Completing the form with the keyboard alone",pre:"The form is open",st:["Tab through every element","Try to reveal the password from the keyboard"],e:"Every interactive element is reachable",r:"The password toggle is a plain div with no tabindex or role, and only eight elements are reachable"}},

{id:"TC-AX-003",a:"fe-a11y",t:"EXP",p:"P2",s:"todo",
 ru:{n:"Видимость индикатора фокуса",pre:"Форма открыта",st:["Пройти поля клавишей Tab и следить за обводкой"],e:"Текущее поле однозначно видно",r:""},
 en:{n:"Visibility of the focus indicator",pre:"The form is open",st:["Tab through the fields and watch the outline"],e:"The focused field is unmistakable",r:""}},

{id:"TC-AX-004",a:"fe-a11y",t:"EXP",p:"P2",s:"todo",
 ru:{n:"Контрастность подписей полей",pre:"Форма открыта",st:["Измерить контраст подписей и текста ошибок к фону"],e:"Контраст не ниже 4.5 к 1",r:""},
 en:{n:"Contrast of the field captions",pre:"The form is open",st:["Measure the contrast of captions and error text against the background"],e:"Contrast of at least 4.5 to 1",r:""}},

{id:"TC-AX-005",a:"fe-a11y",t:"EXP",p:"P2",s:"bug",b:"DEF-51",
 ru:{n:"Связь сообщений об ошибках с полями",pre:"Форма открыта",st:["Вызвать ошибку и проверить aria-describedby и role"],e:"Ошибка связана с полем и объявляется вспомогательными технологиями",r:"Связи нет, у блока ошибки нет role alert"},
 en:{n:"Association between error messages and fields",pre:"The form is open",st:["Trigger an error and check aria-describedby and role"],e:"The error is tied to its field and announced by assistive technology",r:"There is no association and the error block has no alert role"}},

{id:"TC-AX-006",a:"fe-a11y",t:"EXP",p:"P2",s:"bug",b:"DEF-55",
 ru:{n:"Язык документа и язык сообщений",pre:"Форма открыта",st:["Проверить атрибут lang","Вызвать ошибки в разных полях"],e:"Язык документа совпадает с языком интерфейса, сообщения на одном языке",r:"lang=\"en\" при французском интерфейсе; сообщения смешаны — французские и английские"},
 en:{n:"Document language and message language",pre:"The form is open",st:["Check the lang attribute","Trigger errors in different fields"],e:"The document language matches the interface, and messages share one language",r:"lang=\"en\" on a French interface, with messages mixed between French and English"}},

{id:"TC-AX-007",a:"fe-a11y",t:"EXP",p:"P2",s:"bug",b:"DEF-52",
 ru:{n:"Передача обязательности полей",pre:"Форма открыта",st:["Прослушать поля скринридером"],e:"Обязательность объявляется атрибутом, а не только звёздочкой",r:"Атрибут required отсутствует у всех полей, обязательность передаётся только визуальной звёздочкой"},
 en:{n:"Conveying that fields are required",pre:"The form is open",st:["Listen to the fields with a screen reader"],e:"The requirement is conveyed by an attribute, not by an asterisk alone",r:"No field carries required; the requirement is conveyed by a visual asterisk only"}},

{id:"TC-AX-008",a:"fe-a11y",t:"EXP",p:"P2",s:"bug",b:"DEF-56",
 ru:{n:"Единообразие языка сообщений внутри формы",pre:"Форма открыта",st:["Вызвать ошибку в поле имени","Вызвать ошибку формата в поле телефона","Сравнить языки двух сообщений"],e:"Все тексты интерфейса на одном языке",r:"Поле имени отвечает по-английски, поле телефона по-французски"},
 en:{n:"Language consistency of messages within the form",pre:"The form is open",st:["Trigger an error in the name field","Trigger a format error in the phone field","Compare the languages of the two messages"],e:"Every interface text is in one language",r:"The name field answers in English while the phone field answers in French"}},

/* ───────── Маршрутизация ───────── */
{id:"TC-RT-001",a:"fe-route",t:"EG",p:"P1",s:"bug",b:"DEF-46",
 ru:{n:"Открытие несуществующего маршрута",pre:"Приложение запущено",st:["Открыть /nonexistent-page-404"],e:"Страница 404 или перенаправление на форму",r:"Полностью пустая страница, корневой элемент без содержимого"},
 en:{n:"Opening a route that does not exist",pre:"The application is running",st:["Open /nonexistent-page-404"],e:"A 404 page or a redirect to the form",r:"A completely blank page with an empty root element"}},

{id:"TC-RT-002",a:"fe-route",t:"EG",p:"P2",s:"bug",b:"DEF-47",
 ru:{n:"Прямое открытие экрана успеха",pre:"Регистрация не выполнялась",st:["Открыть /success"],e:"Перенаправление на форму",r:"Экран благодарности показан без регистрации"},
 en:{n:"Opening the success screen directly",pre:"No registration has taken place",st:["Open /success"],e:"A redirect to the form",r:"The thank-you screen is shown with no registration"}},

{id:"TC-RT-003",a:"fe-route",t:"EXP",p:"P3",s:"ok",
 ru:{n:"Кнопка возврата на экране успеха",pre:"Открыт экран успеха",st:["Нажать «Go back»"],e:"Возврат на форму",r:"Переход на форму происходит"},
 en:{n:"The back button on the success screen",pre:"The success screen is open",st:["Press “Go back”"],e:"Return to the form",r:"Navigation to the form works"}},

{id:"TC-RT-004",a:"fe-route",t:"EG",p:"P3",s:"todo",
 ru:{n:"Обновление страницы на вложенном маршруте",pre:"Открыт /success",st:["Обновить страницу"],e:"Маршрут открывается, ошибки 404 от сервера нет",r:""},
 en:{n:"Reloading the page on a nested route",pre:"/success is open",st:["Reload the page"],e:"The route opens with no 404 from the server",r:""}},

/* ───────── API ───────── */
{id:"TC-API-001",a:"api",t:"EP",p:"P1",s:"ok",
 ru:{n:"Создание пользователя с корректным телом запроса",pre:"Сервер и база подняты",st:["Отправить POST /users/create со всеми валидными полями"],e:"201, в ответе нет пароля, в базе одна строка",r:"201, пароль в ответе отсутствует, строка создана"},
 en:{n:"Creating a user with a valid request body",pre:"The server and database are running",st:["Send POST /users/create with every field valid"],e:"201, no password in the response, one row in the database",r:"201, no password in the response, and the row was created"}},

{id:"TC-API-002",a:"api",t:"EP",p:"P0",s:"bug",b:"DEF-08",
 ru:{n:"Тело запроса без имени",pre:"Сервер поднят",st:["Отправить тело без ключа first_name"],e:"400 с указанием на поле",r:"500 Internal server error — запрос доходит до вставки и падает на NOT NULL"},
 en:{n:"A request body without a first name",pre:"The server is running",st:["Send a body with no first_name key"],e:"400 naming the field",r:"500 Internal server error — the request reaches the insert and fails on NOT NULL"}},

{id:"TC-API-003",a:"api",t:"EP",p:"P0",s:"bug",b:"DEF-08",
 ru:{n:"Тело запроса без фамилии",pre:"Сервер поднят",st:["Отправить тело без ключа last_name"],e:"400 с указанием на поле",r:"500 Internal server error"},
 en:{n:"A request body without a last name",pre:"The server is running",st:["Send a body with no last_name key"],e:"400 naming the field",r:"500 Internal server error"}},

{id:"TC-API-004",a:"api",t:"EP",p:"P1",s:"ok",
 ru:{n:"Тело запроса без адреса почты",pre:"Сервер поднят",st:["Отправить тело без ключа email"],e:"400",r:"400 «ERROR: invalid email»"},
 en:{n:"A request body without an email address",pre:"The server is running",st:["Send a body with no email key"],e:"400",r:"400 “ERROR: invalid email”"}},

{id:"TC-API-005",a:"api",t:"EP",p:"P1",s:"ok",
 ru:{n:"Тело запроса без согласия",pre:"Сервер поднят",st:["Отправить тело без ключа is_agree"],e:"400",r:"400 «ERROR: is_agree not checked»"},
 en:{n:"A request body without consent",pre:"The server is running",st:["Send a body with no is_agree key"],e:"400",r:"400 “ERROR: is_agree not checked”"}},

{id:"TC-API-006",a:"api",t:"EP",p:"P1",s:"bug",b:"DEF-08",
 ru:{n:"Пустой объект в теле запроса",pre:"Сервер поднят",st:["Отправить {}"],e:"400 с перечислением недостающих полей",r:"400, но сообщение говорит только про is_agree — остальные поля не упомянуты"},
 en:{n:"An empty object as the request body",pre:"The server is running",st:["Send {}"],e:"400 listing the missing fields",r:"400, but the message names only is_agree and omits the rest"}},

{id:"TC-API-007",a:"api",t:"PW",p:"P1",s:"bug",b:"DEF-19",
 ru:{n:"Согласие передано строкой «false»",pre:"Сервер поднят",st:["Отправить \"is_agree\":\"false\""],e:"400: согласие должно быть булевым значением true",r:"201 — строка считается истинной"},
 en:{n:"Consent sent as the string “false”",pre:"The server is running",st:["Send \"is_agree\":\"false\""],e:"400: consent must be the boolean true",r:"201 — the string counts as truthy"}},

{id:"TC-API-008",a:"api",t:"PW",p:"P2",s:"bug",b:"DEF-19",
 ru:{n:"Согласие передано числом",pre:"Сервер поднят",st:["Отправить \"is_agree\":1"],e:"400",r:"201"},
 en:{n:"Consent sent as a number",pre:"The server is running",st:["Send \"is_agree\":1"],e:"400",r:"201"}},

{id:"TC-API-009",a:"api",t:"PW",p:"P1",s:"bug",b:"DEF-20",
 ru:{n:"Имя передано числом",pre:"Сервер поднят",st:["Отправить \"first_name\":12345"],e:"400",r:"201, в базе сохранено 12345"},
 en:{n:"The first name sent as a number",pre:"The server is running",st:["Send \"first_name\":12345"],e:"400",r:"201, and 12345 is stored in the database"}},

{id:"TC-API-010",a:"api",t:"PW",p:"P1",s:"bug",b:"DEF-20",
 ru:{n:"Имя передано массивом",pre:"Сервер поднят",st:["Отправить \"first_name\":[\"a\",\"b\"]"],e:"400",r:"201, в базе сохранено {\"a\",\"b\"}"},
 en:{n:"The first name sent as an array",pre:"The server is running",st:["Send \"first_name\":[\"a\",\"b\"]"],e:"400",r:"201, and {\"a\",\"b\"} is stored in the database"}},

{id:"TC-API-011",a:"api",t:"PW",p:"P2",s:"bug",b:"DEF-20",
 ru:{n:"Телефон передан числом",pre:"Сервер поднят",st:["Отправить \"phone_number\":79001234567"],e:"400 либо явное приведение типа",r:"201: проверка регулярным выражением неявно приводит число к строке"},
 en:{n:"The phone number sent as a number",pre:"The server is running",st:["Send \"phone_number\":79001234567"],e:"400, or an explicit type conversion",r:"201: the regular expression check coerces the number to a string implicitly"}},

{id:"TC-API-012",a:"api",t:"EG",p:"P1",s:"bug",b:"DEF-18",
 ru:{n:"Посторонние поля в теле запроса",pre:"Сервер поднят",st:["Добавить в тело поле role со значением admin"],e:"Поле отброшено либо запрос отклонён",r:"201, поле возвращено в ответе"},
 en:{n:"Unknown fields in the request body",pre:"The server is running",st:["Add a role field with the value admin to the body"],e:"The field is dropped or the request is rejected",r:"201, and the field is echoed back in the response"}},

{id:"TC-API-013",a:"api",t:"EG",p:"P1",s:"bug",b:"DEF-61",
 ru:{n:"Соответствие ответа объявленному контракту",pre:"Сервер поднят",st:["Создать пользователя и сравнить ответ с ShowUserDto"],e:"Ответ содержит ровно четыре объявленных поля",r:"Ответ содержит id и is_agree сверх контракта"},
 en:{n:"Response conformance to the declared contract",pre:"The server is running",st:["Create a user and compare the response with ShowUserDto"],e:"The response holds exactly the four declared fields",r:"The response carries id and is_agree beyond the contract"}},

{id:"TC-API-014",a:"api",t:"EG",p:"P2",s:"bug",b:"DEF-64",
 ru:{n:"Некорректный JSON в теле запроса",pre:"Сервер поднят",st:["Отправить {oops"],e:"400 без раскрытия внутренних подробностей",r:"400 с текстом парсера «Unexpected token o in JSON at position 1»"},
 en:{n:"Malformed JSON in the request body",pre:"The server is running",st:["Send {oops"],e:"400 with no internal detail disclosed",r:"400 carrying the parser text “Unexpected token o in JSON at position 1”"}},

{id:"TC-API-015",a:"api",t:"EG",p:"P2",s:"bug",b:"DEF-08",
 ru:{n:"Запрос без заголовка типа содержимого",pre:"Сервер поднят",st:["Отправить форму как application/x-www-form-urlencoded"],e:"415 либо корректный разбор",r:"400 «is_agree not checked» — тело просто не разобрано, причина не названа"},
 en:{n:"A request without a content type header",pre:"The server is running",st:["Send the form as application/x-www-form-urlencoded"],e:"415, or the body is parsed correctly",r:"400 “is_agree not checked” — the body is simply not parsed and the reason is not stated"}},

{id:"TC-API-016",a:"api",t:"BVA",p:"P2",s:"bug",b:"DEF-68",
 ru:{n:"Границы размера тела запроса",pre:"Сервер поднят",st:["Отправить тело 92 КБ","Отправить тело 204 КБ"],e:"Оба отклонены прикладным ограничением длины поля",r:"92 КБ → 201 и запись в базу; 204 КБ → 413 стандартным лимитом Express"},
 en:{n:"Request body size boundaries",pre:"The server is running",st:["Send a 92 KB body","Send a 204 KB body"],e:"Both rejected by an application-level field length check",r:"92 KB → 201 and a row is written; 204 KB → 413 from the Express default"}},

{id:"TC-API-017",a:"api",t:"EG",p:"P2",s:"bug",b:"DEF-23",
 ru:{n:"Корневой маршрут сервиса",pre:"Сервер поднят",st:["Выполнить GET /"],e:"200 «Service is working!» — так объявлено в коде и в e2e-тесте",r:"404: AppController не подключён к AppModule"},
 en:{n:"The service root route",pre:"The server is running",st:["Send GET /"],e:"200 “Service is working!”, as declared in the code and in the e2e test",r:"404: AppController is not registered with AppModule"}},

{id:"TC-API-018",a:"api",t:"EG",p:"P3",s:"ok",
 ru:{n:"Неподдерживаемые маршруты и методы",pre:"Сервер поднят",st:["GET /users/create","PUT /users/create","GET /users"],e:"404 или 405",r:"Все три отвечают 404"},
 en:{n:"Unsupported routes and methods",pre:"The server is running",st:["GET /users/create","PUT /users/create","GET /users"],e:"404 or 405",r:"All three answer 404"}},

{id:"TC-API-019",a:"api",t:"BVA",p:"P1",s:"bug",b:"DEF-15",
 ru:{n:"Имя длиной десять тысяч символов",pre:"Сервер поднят",st:["Отправить first_name из 10 000 символов"],e:"400: длина ограничена",r:"201, значение записано целиком — колонка объявлена без ограничения длины"},
 en:{n:"A ten-thousand-character name",pre:"The server is running",st:["Send a first_name of 10,000 characters"],e:"400: the length is bounded",r:"201, and the value is stored in full — the column is declared without a length limit"}},

{id:"TC-API-020",a:"api",t:"EG",p:"P1",s:"bug",b:"DEF-41",
 ru:{n:"Имя из одного пробела",pre:"Сервер поднят",st:["Отправить \"first_name\":\" \""],e:"400: значение пустое после обрезки",r:"201 — проверка сравнивает значение на истинность, а пробел истинен"},
 en:{n:"A name consisting of a single space",pre:"The server is running",st:["Send \"first_name\":\" \""],e:"400: the value is empty once trimmed",r:"201 — the check tests truthiness, and a space is truthy"}},

{id:"TC-API-021",a:"api",t:"BVA",p:"P2",s:"bug",b:"DEF-17",
 ru:{n:"Пароль без верхней границы длины",pre:"Сервер поднят",st:["Отправить пароль из 1000 символов"],e:"400: та же граница 28, что и на клиенте",r:"201 — серверное выражение не ограничивает длину сверху"},
 en:{n:"A password with no upper length bound",pre:"The server is running",st:["Send a 1000-character password"],e:"400: the same 28-character boundary as the client",r:"201 — the server expression sets no upper bound"}},

{id:"TC-API-022",a:"api",t:"BVA",p:"P2",s:"bug",b:"DEF-16",
 ru:{n:"Телефон из одной цифры",pre:"Сервер поднят",st:["Отправить \"phone_number\":\"7\""],e:"400: минимум восемь цифр, как на клиенте",r:"201 — на сервере проверяется только набор символов"},
 en:{n:"A one-digit phone number",pre:"The server is running",st:["Send \"phone_number\":\"7\""],e:"400: a minimum of eight digits, as on the client",r:"201 — the server checks only the character set"}},

{id:"TC-API-023",a:"api",t:"BVA",p:"P3",s:"todo",
 ru:{n:"Адрес почты длиннее допустимого по стандарту",pre:"Сервер поднят",st:["Отправить адрес длиной более 320 символов"],e:"400",r:""},
 en:{n:"An email address longer than the standard allows",pre:"The server is running",st:["Send an address longer than 320 characters"],e:"400",r:""}},

{id:"TC-API-024",a:"api",t:"PW",p:"P3",s:"todo",
 ru:{n:"Поля со значением null",pre:"Сервер поднят",st:["Отправить \"first_name\":null"],e:"400",r:""},
 en:{n:"Fields carrying null",pre:"The server is running",st:["Send \"first_name\":null"],e:"400",r:""}},

{id:"TC-API-025",a:"api",t:"EG",p:"P3",s:"todo",
 ru:{n:"Повторяющиеся ключи в JSON",pre:"Сервер поднят",st:["Отправить тело с двумя ключами email"],e:"Поведение определено и задокументировано",r:""},
 en:{n:"Duplicate keys in the JSON body",pre:"The server is running",st:["Send a body with two email keys"],e:"The behaviour is defined and documented",r:""}},

{id:"TC-API-026",a:"api",t:"EG",p:"P3",s:"todo",
 ru:{n:"Нулевой байт и управляющие символы в значениях",pre:"Сервер поднят",st:["Отправить имя с символом \\u0000"],e:"400 либо безопасная обработка",r:""},
 en:{n:"Null bytes and control characters in values",pre:"The server is running",st:["Send a name containing \\u0000"],e:"400, or safe handling",r:""}},

/* ───────── Безопасность ───────── */
{id:"TC-SEC-001",a:"sec",t:"EG",p:"P0",s:"bug",b:"DEF-02",
 ru:{n:"Подмена идентификатора в теле запроса перезаписывает чужую запись",pre:"В базе есть пользователь с известным id",st:["Отправить регистрацию, добавив в тело \"id\" существующей строки","Прочитать эту строку"],e:"Поле id игнорируется, создаётся новая запись",r:"Ответ 201, но строка id=2 заменена: Jean/a@b.co превратилось в ATTACKER/attacker@evil.co"},
 en:{n:"An injected identifier overwrites another user's record",pre:"The database holds a user with a known id",st:["Send a registration with the \"id\" of an existing row added to the body","Read that row back"],e:"The id field is ignored and a new record is created",r:"The response is 201, yet row id=2 was replaced: Jean/a@b.co became ATTACKER/attacker@evil.co"}},

{id:"TC-SEC-002",a:"sec",t:"SEC",p:"P0",s:"bug",b:"DEF-03",
 ru:{n:"Хранение пароля в базе",pre:"Пользователь зарегистрирован",st:["Прочитать колонку password"],e:"Хранится необратимый хеш",r:"Хранится исходная строка Abcdef1!"},
 en:{n:"How the password is stored",pre:"A user is registered",st:["Read the password column"],e:"An irreversible hash is stored",r:"The original string Abcdef1! is stored"}},

{id:"TC-SEC-003",a:"sec",t:"SEC",p:"P0",s:"bug",b:"DEF-04",
 ru:{n:"Пароль в журнале приложения",pre:"Стек поднят командой из README, то есть с DEBUG=true",st:["Отправить регистрацию","Прочитать журнал контейнера бэкенда"],e:"Пароль не попадает в журнал ни при каких настройках",r:"Тело запроса печатается целиком, включая пароль"},
 en:{n:"The password in the application log",pre:"The stack was started with the README command, so DEBUG is true",st:["Send a registration","Read the backend container log"],e:"The password never reaches the log under any configuration",r:"The request body is printed in full, password included"}},

{id:"TC-SEC-004",a:"sec",t:"SEC",p:"P1",s:"bug",b:"DEF-22",
 ru:{n:"Ограничение частоты регистраций",pre:"Сервер поднят",st:["Отправить шестьдесят запросов подряд"],e:"Часть запросов отклонена с кодом 429",r:"60 из 60 успешны за 0,94 секунды"},
 en:{n:"Registration rate limiting",pre:"The server is running",st:["Send sixty requests in a row"],e:"Some requests are rejected with 429",r:"60 out of 60 succeed in 0.94 seconds"}},

{id:"TC-SEC-005",a:"sec",t:"SEC",p:"P1",s:"bug",b:"DEF-31",
 ru:{n:"Политика общего доступа между источниками",pre:"Сервер поднят",st:["Отправить предварительный и основной запрос с посторонним Origin"],e:"Разрешён только известный источник фронтенда",r:"Access-Control-Allow-Origin: * и успешный 201 с чужого источника"},
 en:{n:"The cross-origin sharing policy",pre:"The server is running",st:["Send a preflight and then a main request with a foreign Origin"],e:"Only the application's own frontend origin is allowed",r:"Access-Control-Allow-Origin: * and a successful 201 from a foreign origin"}},

{id:"TC-SEC-006",a:"sec",t:"SEC",p:"P1",s:"ok",
 ru:{n:"Внедрение SQL через поля формы",pre:"Сервер поднят",st:["Отправить в имени строку с закрывающей кавычкой и DROP TABLE","Проверить, что таблица на месте"],e:"Запрос параметризован, таблица цела",r:"Значение сохранено как обычный текст, таблица цела — TypeORM параметризует запросы"},
 en:{n:"SQL injection through the form fields",pre:"The server is running",st:["Send a name containing a closing quote and DROP TABLE","Verify the table still exists"],e:"The query is parameterised and the table is intact",r:"The value is stored as plain text and the table is intact — TypeORM parameterises its queries"}},

{id:"TC-SEC-007",a:"sec",t:"SEC",p:"P1",s:"bug",b:"DEF-29",
 ru:{n:"Сохранение потенциально исполняемой разметки",pre:"Сервер поднят",st:["Отправить в имени тег script"],e:"Значение отклонено либо экранировано при сохранении",r:"Сохранено дословно. Прямой эксплуатации сейчас нет, потому что нет эндпоинта чтения, — риск отложенный"},
 en:{n:"Storing potentially executable markup",pre:"The server is running",st:["Send a script tag as the first name"],e:"The value is rejected or escaped on write",r:"Stored verbatim. There is no direct exploit today because no endpoint reads it back — the risk is deferred"}},

{id:"TC-SEC-008",a:"sec",t:"SEC",p:"P2",s:"bug",b:"DEF-62",
 ru:{n:"Заголовки безопасности в ответе",pre:"Сервер поднят",st:["Посмотреть заголовки ответа"],e:"Присутствуют CSP, X-Content-Type-Options, X-Frame-Options",r:"Ни одного заголовка безопасности нет"},
 en:{n:"Security headers in the response",pre:"The server is running",st:["Inspect the response headers"],e:"CSP, X-Content-Type-Options and X-Frame-Options are present",r:"Not one security header is present"}},

{id:"TC-SEC-009",a:"sec",t:"SEC",p:"P2",s:"bug",b:"DEF-63",
 ru:{n:"Раскрытие используемого фреймворка",pre:"Сервер поднят",st:["Посмотреть заголовок X-Powered-By"],e:"Заголовок отсутствует",r:"X-Powered-By: Express"},
 en:{n:"Disclosure of the framework in use",pre:"The server is running",st:["Inspect the X-Powered-By header"],e:"The header is absent",r:"X-Powered-By: Express"}},

{id:"TC-SEC-010",a:"sec",t:"SEC",p:"P2",s:"bug",b:"DEF-78",
 ru:{n:"Передача пароля по открытому каналу",pre:"Стек поднят по инструкции",st:["Посмотреть схему обращения фронтенда к API"],e:"Трафик защищён TLS",r:"Обмен идёт по http, пароль передаётся в открытом виде"},
 en:{n:"Sending the password over an unencrypted channel",pre:"The stack was started per the instructions",st:["Inspect the scheme the frontend uses to reach the API"],e:"The traffic is protected by TLS",r:"The exchange runs over http and the password travels in clear text"}},

{id:"TC-SEC-011",a:"sec",t:"SEC",p:"P2",s:"bug",b:"DEF-33",
 ru:{n:"Доступность базы данных снаружи",pre:"Стек поднят",st:["Посмотреть проброшенные порты"],e:"База не публикуется наружу",r:"5432 опубликован на 0.0.0.0, пароль задан строкой secret в файле конфигурации"},
 en:{n:"External reachability of the database",pre:"The stack is running",st:["Inspect the published ports"],e:"The database is not published externally",r:"5432 is published on 0.0.0.0 and the password is hard-coded as secret in the config file"}},

{id:"TC-SEC-012",a:"sec",t:"SEC",p:"P2",s:"bug",b:"DEF-75",
 ru:{n:"Подтверждение владения адресом почты",pre:"Сервер поднят",st:["Зарегистрироваться на заведомо чужой адрес"],e:"Учётная запись не активна до подтверждения",r:"Запись создаётся сразу, подтверждения нет, капчи нет"},
 en:{n:"Confirming ownership of the email address",pre:"The server is running",st:["Register with an address that is knowingly not yours"],e:"The account stays inactive until confirmed",r:"The record is created immediately, with no confirmation and no captcha"}},

{id:"TC-SEC-013",a:"sec",t:"SEC",p:"P2",s:"ok",
 ru:{n:"Раскрытие внутренних подробностей в ошибке 500",pre:"Сервер поднят",st:["Вызвать ошибку 500 запросом без имени"],e:"Клиент не получает трассировку стека",r:"Возвращается только «Internal server error», трассировка остаётся в журнале"},
 en:{n:"Internal detail disclosure in a 500 response",pre:"The server is running",st:["Trigger a 500 with a request that omits the first name"],e:"The client receives no stack trace",r:"Only “Internal server error” is returned; the trace stays in the log"}},

{id:"TC-SEC-014",a:"sec",t:"EG",p:"P3",s:"todo",
 ru:{n:"Загрязнение прототипа через тело запроса",pre:"Сервер поднят",st:["Отправить тело с ключом __proto__"],e:"Ключ игнорируется",r:""},
 en:{n:"Prototype pollution through the request body",pre:"The server is running",st:["Send a body containing a __proto__ key"],e:"The key is ignored",r:""}},

/* ───────── Данные ───────── */
{id:"TC-DB-001",a:"data",t:"EP",p:"P1",s:"bug",b:"DEF-09",
 ru:{n:"Уникальность адреса почты",pre:"Сервер поднят",st:["Дважды отправить регистрацию с одним адресом"],e:"Второй запрос отклонён с кодом 409",r:"Оба запроса успешны, в базе две строки с одним адресом"},
 en:{n:"Uniqueness of the email address",pre:"The server is running",st:["Send the same registration twice with one address"],e:"The second request is rejected with 409",r:"Both requests succeed and the database holds two rows with the same address"}},

{id:"TC-DB-002",a:"data",t:"BVA",p:"P1",s:"bug",b:"DEF-27",
 ru:{n:"Ограничения длины колонок",pre:"База поднята",st:["Посмотреть описание таблицы users"],e:"У текстовых колонок задана максимальная длина",r:"Все колонки объявлены как character varying без длины"},
 en:{n:"Column length constraints",pre:"The database is running",st:["Inspect the users table definition"],e:"The text columns carry a maximum length",r:"Every column is declared character varying with no length"}},

{id:"TC-DB-003",a:"data",t:"EG",p:"P2",s:"bug",b:"DEF-66",
 ru:{n:"Автоматическая синхронизация схемы",pre:"Проект собран",st:["Посмотреть ormconfig.ts"],e:"Схема управляется миграциями",r:"synchronize: true — схема приводится к виду сущностей при каждом старте"},
 en:{n:"Automatic schema synchronisation",pre:"The project is built",st:["Inspect ormconfig.ts"],e:"The schema is driven by migrations",r:"synchronize: true — the schema is aligned to the entities on every start"}},

{id:"TC-DB-004",a:"data",t:"EG",p:"P2",s:"bug",b:"DEF-65",
 ru:{n:"Временные метки записи",pre:"База поднята",st:["Посмотреть колонки таблицы users"],e:"Есть отметки создания и изменения",r:"Колонок created_at и updated_at нет"},
 en:{n:"Record timestamps",pre:"The database is running",st:["Inspect the columns of the users table"],e:"Creation and modification marks are present",r:"There is no created_at and no updated_at"}},

{id:"TC-DB-005",a:"data",t:"EG",p:"P3",s:"bug",b:"DEF-67",
 ru:{n:"Расход последовательности при неудачных вставках",pre:"База пуста",st:["Отправить два запроса, приводящих к 500","Создать корректного пользователя"],e:"Идентификаторы идут подряд",r:"После двух падений успешная запись получила id 5 вместо 3"},
 en:{n:"Sequence consumption on failed inserts",pre:"The database is empty",st:["Send two requests that produce a 500","Create a valid user"],e:"Identifiers run consecutively",r:"After two failures the successful record received id 5 instead of 3"}},

{id:"TC-DB-006",a:"data",t:"EG",p:"P1",s:"bug",b:"DEF-21",
 ru:{n:"Сохранность данных при перезапуске стека",pre:"В базе есть пользователи",st:["Выполнить docker compose down","Поднять стек заново","Прочитать таблицу users"],e:"Данные на месте",r:"Том смонтирован в /var/lib/mysql, а Postgres пишет в /var/lib/postgresql/data — данные теряются"},
 en:{n:"Data survival across a stack restart",pre:"The database holds users",st:["Run docker compose down","Bring the stack back up","Read the users table"],e:"The data is still there",r:"The volume is mounted at /var/lib/mysql while Postgres writes to /var/lib/postgresql/data — the data is lost"}},

{id:"TC-DB-007",a:"data",t:"EG",p:"P2",s:"bug",b:"DEF-09",
 ru:{n:"Индексы таблицы",pre:"База поднята",st:["Посмотреть индексы таблицы users"],e:"Есть индекс по полю, по которому будет идти поиск при входе",r:"Единственный индекс — первичный ключ"},
 en:{n:"Table indexes",pre:"The database is running",st:["Inspect the indexes on the users table"],e:"An index exists on the field sign-in will search by",r:"The primary key is the only index"}},

{id:"TC-DB-008",a:"data",t:"EP",p:"P3",s:"ok",
 ru:{n:"Сохранение символов с диакритикой в базе",pre:"База поднята",st:["Отправить имя François через API, минуя фронтенд","Прочитать значение обратно"],e:"Значение сохранено и прочитано без искажений",r:"Сохранено и прочитано корректно"},
 en:{n:"Storing diacritics in the database",pre:"The database is running",st:["Send the name François through the API, bypassing the frontend","Read the value back"],e:"The value is stored and read without corruption",r:"Stored and read correctly"}},

/* ───────── Инфраструктура ───────── */
{id:"TC-INF-001",a:"infra",t:"EG",p:"P0",s:"bug",b:"DEF-06",
 ru:{n:"Запуск проекта по инструкции из README",pre:"Чистая копия репозитория, Docker установлен",st:["Выполнить docker compose up в корне проекта"],e:"Оба сервиса поднимаются, приложение доступно на порту 3000",r:"Установка зависимостей падает: mapped-types и sass подтянулись в версиях, требующих Node 20, при зафиксированном Node 18"},
 en:{n:"Starting the project per the README",pre:"A clean clone of the repository with Docker installed",st:["Run docker compose up in the project root"],e:"Both services start and the application is reachable on port 3000",r:"Dependency installation fails: mapped-types and sass resolved to versions requiring Node 20 while Node 18 is pinned"}},

{id:"TC-INF-002",a:"infra",t:"EG",p:"P1",s:"bug",b:"DEF-25",
 ru:{n:"Запуск юнит-тестов бэкенда",pre:"Зависимости установлены",st:["Выполнить yarn test"],e:"Тесты выполняются и проходят",r:"0 совпадений по шаблону, команда завершается с кодом 1"},
 en:{n:"Running the backend unit tests",pre:"Dependencies are installed",st:["Run yarn test"],e:"The tests run and pass",r:"0 matches for the pattern and the command exits with code 1"}},

{id:"TC-INF-003",a:"infra",t:"EG",p:"P1",s:"bug",b:"DEF-24",
 ru:{n:"Запуск e2e-тестов бэкенда",pre:"Зависимости установлены",st:["Выполнить yarn test:e2e"],e:"Тест проходит",r:"Падение на разрешении модуля src/config/regex.config, до проверок дело не доходит"},
 en:{n:"Running the backend e2e tests",pre:"Dependencies are installed",st:["Run yarn test:e2e"],e:"The test passes",r:"It fails resolving the module src/config/regex.config and never reaches an assertion"}},

{id:"TC-INF-004",a:"infra",t:"EG",p:"P2",s:"bug",b:"DEF-69",
 ru:{n:"Проверка стиля кода",pre:"Рабочее дерево чистое",st:["Выполнить yarn lint","Посмотреть git status"],e:"Линтер сообщает о проблемах, файлы не изменены",r:"Изменены четыре файла: в скрипт зашит флаг --fix"},
 en:{n:"The code style check",pre:"The working tree is clean",st:["Run yarn lint","Run git status"],e:"The linter reports problems and changes no files",r:"Four files were modified: the script has --fix baked in"}},

{id:"TC-INF-005",a:"infra",t:"EG",p:"P2",s:"ok",
 ru:{n:"Сборка бэкенда",pre:"Зависимости установлены",st:["Выполнить yarn build"],e:"Сборка проходит",r:"Сборка проходит с предупреждениями TypeScript об устаревших методах"},
 en:{n:"Building the backend",pre:"Dependencies are installed",st:["Run yarn build"],e:"The build succeeds",r:"The build succeeds with TypeScript warnings about deprecated methods"}},

{id:"TC-INF-006",a:"infra",t:"EG",p:"P2",s:"bug",b:"DEF-71",
 ru:{n:"Готовность базы к моменту старта бэкенда",pre:"Образы не прогреты",st:["Поднять стек с нуля"],e:"Бэкенд ждёт готовности базы",r:"Healthcheck у базы отсутствует, зависимость объявлена без условия — гонка при холодном старте"},
 en:{n:"Database readiness when the backend starts",pre:"The images are not warmed up",st:["Bring the stack up from scratch"],e:"The backend waits for the database",r:"The database has no health check and the dependency has no condition — a race on a cold start"}},

{id:"TC-INF-007",a:"infra",t:"EG",p:"P2",s:"bug",b:"DEF-33",
 ru:{n:"Область видимости проброшенных портов",pre:"Стек поднят",st:["Посмотреть привязку портов"],e:"Порты доступны только с локальной машины",r:"Все три порта опубликованы на 0.0.0.0"},
 en:{n:"Scope of the published ports",pre:"The stack is running",st:["Inspect the port bindings"],e:"The ports are reachable only from the local machine",r:"All three ports are published on 0.0.0.0"}},

{id:"TC-INF-008",a:"infra",t:"EG",p:"P3",s:"bug",b:"DEF-73",
 ru:{n:"Предупреждения при разборе файла docker-compose",pre:"Docker Compose v2",st:["Выполнить docker compose up"],e:"Предупреждений нет",r:"Предупреждение об устаревшем ключе version"},
 en:{n:"Warnings when parsing the compose file",pre:"Docker Compose v2",st:["Run docker compose up"],e:"No warnings",r:"A warning about the obsolete version key"}},

{id:"TC-INF-009",a:"infra",t:"EG",p:"P2",s:"bug",b:"DEF-72",
 ru:{n:"Артефакты установки в примонтированном каталоге",pre:"Стек поднят",st:["Посмотреть владельца каталогов node_modules на хосте"],e:"Файлы принадлежат пользователю, запустившему стек",r:"Каталоги принадлежат root — удаление требует повышения прав"},
 en:{n:"Install artefacts inside the mounted directory",pre:"The stack is running",st:["Check the owner of the node_modules directories on the host"],e:"The files belong to the user who started the stack",r:"The directories are owned by root, so removing them needs elevated rights"}},

{id:"TC-INF-010",a:"infra",t:"EG",p:"P2",s:"bug",b:"DEF-30",
 ru:{n:"Отладочный режим включён по умолчанию",pre:"Стек поднят по инструкции",st:["Посмотреть значение DEBUG в docker-compose"],e:"Отладочный вывод по умолчанию выключен",r:"DEBUG: true — логирование тел запросов включено в любом окружении, поднятом по README"},
 en:{n:"Debug mode enabled by default",pre:"The stack was started per the instructions",st:["Inspect the DEBUG value in docker-compose"],e:"Debug output is off by default",r:"DEBUG: true — request body logging is on in every environment started from the README"}},

{id:"TC-INF-011",a:"infra",t:"EG",p:"P3",s:"bug",b:"DEF-77",
 ru:{n:"Наличие описания переменных окружения",pre:"Репозиторий склонирован",st:["Поискать .env.example и описание переменных"],e:"Переменные описаны",r:"Ни .env.example, ни Dockerfile, ни описания переменных в README нет"},
 en:{n:"Documentation of the environment variables",pre:"The repository is cloned",st:["Look for .env.example and a variable description"],e:"The variables are documented",r:"There is no .env.example, no Dockerfile and no variable documentation in the README"}},

{id:"TC-INF-012",a:"infra",t:"EG",p:"P1",s:"bug",b:"DEF-28",
 ru:{n:"Воспроизводимость установки зависимостей",pre:"Репозиторий склонирован",st:["Проверить наличие yarn.lock в обоих пакетах","Открыть .gitignore и найти строку yarn.lock","Установить зависимости дважды с интервалом и сравнить разрешённые версии"],e:"Lock-файлы закоммичены, обе установки дают одинаковые версии",r:"yarn.lock перечислен в .gitignore, lock-файлов в репозитории нет — дерево зависимостей пересчитывается каждый раз"},
 en:{n:"Reproducibility of the dependency install",pre:"The repository is cloned",st:["Check both packages for a yarn.lock","Open .gitignore and find the yarn.lock entry","Install dependencies twice with a gap and compare the resolved versions"],e:"Lock files are committed and both installs resolve identical versions",r:"yarn.lock is listed in .gitignore and no lock file is present — the dependency tree is recomputed every time"}},

{id:"TC-INF-013",a:"infra",t:"SEC",p:"P2",s:"bug",b:"DEF-70",
 ru:{n:"Хранение пароля базы в конфигурации запуска",pre:"Репозиторий склонирован",st:["Открыть docker-compose.yml","Найти переменную POSTGRES_PASSWORD"],e:"Пароль берётся из переменных окружения или системы управления секретами",r:"POSTGRES_PASSWORD: \"secret\" — значение записано в файл и попадает в репозиторий"},
 en:{n:"How the database password is kept in the run configuration",pre:"The repository is cloned",st:["Open docker-compose.yml","Find the POSTGRES_PASSWORD variable"],e:"The password comes from environment variables or a secret manager",r:"POSTGRES_PASSWORD: \"secret\" — the value is hard-coded into the file and lands in the repository"}},

/* ───────── Сквозные сценарии ───────── */
{id:"TC-E2E-001",a:"e2e",t:"DT",p:"P0",s:"ok",b:"DEF-03",
 ru:{n:"Счастливый путь: форма до строки в базе",pre:"Стек поднят, база пуста",st:["Заполнить все поля значениями, валидными для обоих слоёв","Поставить галочку согласия и отправить","Прочитать таблицу users"],e:"Экран успеха и ровно одна корректная строка",r:"Экран успеха, одна строка. Оговорка: пароль в строке хранится открытым текстом, см. DEF-03"},
 en:{n:"Happy path: from the form to a database row",pre:"The stack is running and the database is empty",st:["Fill every field with values valid on both layers","Tick the consent box and submit","Read the users table"],e:"The success screen and exactly one correct row",r:"Success screen, one row. With a caveat: the password in that row is stored in clear text, see DEF-03"}},

{id:"TC-E2E-002",a:"e2e",t:"DT",p:"P0",s:"bug",b:"DEF-01",
 ru:{n:"Расхождение правил пароля приводит к молчаливой потере регистрации",pre:"Стек поднят, база пуста",st:["Заполнить форму паролем password1","Отправить","Сверить экран, ответ сервера и содержимое базы"],e:"Пользователь узнаёт, что регистрация не прошла",r:"Экран успеха, ответ 400, в базе ноль строк — самый тяжёлый сценарий продукта"},
 en:{n:"Diverging password rules silently lose a registration",pre:"The stack is running and the database is empty",st:["Fill the form with the password password1","Submit","Compare the screen, the server response and the database contents"],e:"The user learns the registration did not go through",r:"Success screen, a 400 response and zero rows — the product's worst scenario"}},

{id:"TC-E2E-003",a:"e2e",t:"STT",p:"P0",s:"bug",b:"DEF-07",
 ru:{n:"Баг с Backspace доводит однозначный телефон до базы",pre:"Стек поднят",st:["Ввести в телефон две цифры и нажать Backspace","Оставить в поле одну цифру","Заполнить остальные поля и отправить","Прочитать таблицу"],e:"Телефон из одной цифры не проходит ни один слой",r:"Форма принимает, сервер принимает, в базе телефон 7 длиной один символ — оба слоя пропустили"},
 en:{n:"The Backspace defect carries a one-digit phone into the database",pre:"The stack is running",st:["Type two digits into the phone field and press Backspace","Leave a single digit in the field","Fill the remaining fields and submit","Read the table"],e:"A one-digit phone number passes neither layer",r:"The form accepts it, the server accepts it, and the database holds the phone number 7, one character long — both layers let it through"}},

{id:"TC-E2E-004",a:"e2e",t:"EXP",p:"P1",s:"bug",b:"DEF-10",
 ru:{n:"Двойная отправка создаёт дубликаты учётных записей",pre:"Стек поднят, база пуста",st:["Заполнить форму валидно","Быстро нажать кнопку отправки три раза","Прочитать таблицу"],e:"Одна запись",r:"Три идентичные записи: ни клиент, ни схема базы дубликаты не отсекают"},
 en:{n:"Double submission creates duplicate accounts",pre:"The stack is running and the database is empty",st:["Fill the form with valid values","Press the submit button three times quickly","Read the table"],e:"One record",r:"Three identical records: neither the client nor the schema rejects duplicates"}},

{id:"TC-E2E-005",a:"e2e",t:"DT",p:"P1",s:"bug",b:"DEF-01",
 ru:{n:"Регистрация при недоступном бэкенде",pre:"Контейнер бэкенда остановлен",st:["Заполнить форму валидно и отправить"],e:"Сообщение о недоступности сервиса",r:"Экран успеха при ERR_CONNECTION_REFUSED"},
 en:{n:"Registering while the backend is down",pre:"The backend container is stopped",st:["Fill the form with valid values and submit"],e:"A message saying the service is unavailable",r:"The success screen appears despite ERR_CONNECTION_REFUSED"}},

{id:"TC-E2E-006",a:"e2e",t:"EG",p:"P1",s:"bug",b:"DEF-21",
 ru:{n:"Данные пользователей после перезапуска стека",pre:"Зарегистрировано несколько пользователей",st:["Выполнить docker compose down и поднять стек заново","Прочитать таблицу"],e:"Пользователи на месте",r:"Таблица пуста: том смонтирован мимо каталога данных Postgres"},
 en:{n:"User data after a stack restart",pre:"Several users are registered",st:["Run docker compose down and bring the stack back up","Read the table"],e:"The users are still there",r:"The table is empty: the volume is mounted away from the Postgres data directory"}},

{id:"TC-E2E-007",a:"e2e",t:"EP",p:"P2",s:"bug",b:"DEF-11",
 ru:{n:"Регистрация французского пользователя через интерфейс",pre:"Стек поднят",st:["Попытаться зарегистрировать François Müller с телефоном 06 12 34 56 78"],e:"Регистрация проходит",r:"Невозможна: имя отклонено по диакритике, телефон — по формату. Через API те же данные проходят"},
 en:{n:"Registering a French user through the interface",pre:"The stack is running",st:["Try to register François Müller with the phone number 06 12 34 56 78"],e:"The registration succeeds",r:"Impossible: the name is rejected for its diacritics and the phone for its format. The same data passes through the API"}},

{id:"TC-E2E-008",a:"e2e",t:"EP",p:"P2",s:"bug",b:"DEF-09",
 ru:{n:"Повторная регистрация на тот же адрес через интерфейс",pre:"Пользователь уже зарегистрирован",st:["Пройти форму заново с тем же адресом почты"],e:"Сообщение, что адрес занят",r:"Создаётся вторая учётная запись, пользователь видит экран успеха"},
 en:{n:"Re-registering the same address through the interface",pre:"The user is already registered",st:["Complete the form again with the same email address"],e:"A message saying the address is taken",r:"A second account is created and the user sees the success screen"}},

/* ───────── Нефункциональные ───────── */
{id:"TC-NFR-001",a:"nfr",t:"SEC",p:"P2",s:"bug",b:"DEF-22",
 ru:{n:"Поведение под потоком регистраций",pre:"Стек поднят",st:["Отправить шестьдесят запросов подряд и замерить время"],e:"Сервис ограничивает частоту",r:"60 успешных ответов за 0,94 секунды без единого отказа"},
 en:{n:"Behaviour under a stream of registrations",pre:"The stack is running",st:["Send sixty requests in a row and measure the elapsed time"],e:"The service limits the rate",r:"60 successful responses in 0.94 seconds with no rejections"}},

{id:"TC-NFR-002",a:"nfr",t:"EG",p:"P2",s:"bug",b:"DEF-74",
 ru:{n:"Режим сборки фронтенда",pre:"Стек поднят по инструкции",st:["Посмотреть команду запуска фронтенда"],e:"Для демонстрации используется production-сборка",r:"Запускается react-scripts start — режим разработки с исходными картами и без минификации"},
 en:{n:"The frontend build mode",pre:"The stack was started per the instructions",st:["Inspect the frontend start command"],e:"A production build is used for the demo",r:"react-scripts start is used — development mode with source maps and no minification"}},

{id:"TC-NFR-003",a:"nfr",t:"EG",p:"P2",s:"todo",
 ru:{n:"Поведение сервиса при недоступной базе",pre:"Контейнер базы остановлен",st:["Отправить регистрацию"],e:"503 с понятным сообщением",r:""},
 en:{n:"Service behaviour with the database down",pre:"The database container is stopped",st:["Send a registration"],e:"503 with a clear message",r:""}},

{id:"TC-NFR-004",a:"nfr",t:"EG",p:"P3",s:"todo",
 ru:{n:"Время холодного старта стека",pre:"Образы скачаны, зависимости не установлены",st:["Замерить время от docker compose up до готовности обоих сервисов"],e:"Время известно и приемлемо",r:""},
 en:{n:"Cold start time for the stack",pre:"Images are pulled but dependencies are not installed",st:["Measure the time from docker compose up until both services are ready"],e:"The time is known and acceptable",r:""}},

{id:"TC-NFR-005",a:"nfr",t:"EG",p:"P3",s:"todo",
 ru:{n:"Размер и состав клиентского бандла",pre:"Выполнена production-сборка",st:["Собрать фронтенд и посмотреть размер и наличие исходных карт"],e:"Исходные карты не публикуются, размер разумен",r:""},
 en:{n:"Size and contents of the client bundle",pre:"A production build has been produced",st:["Build the frontend and inspect its size and whether source maps ship"],e:"Source maps are not published and the size is reasonable",r:""}}

];
