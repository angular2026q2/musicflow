## Entry #15

**createdAt:** 4 June 2026

### Задачи и мысли (планы)

Продолжение флоу авторизации: нужно было завершить цикл сброса пароля и реализовать страницу `/reset-password` на фронтенде, куда Supabase редиректит пользователя
после клика по ссылке из письма, если пользователь запросил "Forgot password". Параллельно обнаружились и были исправлены два серьёзных бага в бэкенде, которые блокировали 
работу регистрации и смены пароля.

### Реализация

**Frontend `ResetPasswordPage` (`/reset-password`):**

- Страница должна принимать токены из URL-хэша (`#access_token=...&refresh_token=...&type=recovery`) в `ngOnInit()`
- из URL извлекаются `access_token` и `refresh_token` через `URLSearchParams`, и их сохраняю в `signal<string | null>`
- Если любой из токенов отсутствует или `type !== 'recovery'`, должен происходить редирект на главную `/`
- После сохранения токенов в сигналы, вызывается `window.history.replaceState({}, '', '/reset-password')`, который очищает адресную строку
- Форма на двух полях (`password`, `confirmPassword`) с кастомным validator-ом на совпадение
- При success: показывает toast c сообщением, запускает `sign-in` модалку через `ModalService`, а страницу редиректит на `/`
- При fail: показывает toast с сообщением, запускает `sign-in` модалку и редиректит на `/`

**Frontend `AuthService`:**

- Добавил метод `confirmPasswordReset(token, refreshToken, newPassword)`, который отправляет POST запрос на `/v1/auth/update-password` с тремя полями: 
- `access_token`, 
  `refresh_token`, 
  `new_password`

**Backend `UpdatePasswordDto`, `AuthService`, `AuthController`:**

- В `UpdatePasswordDto` добавил поле `refresh_token: string` с валидацией `@IsString()`
- обновил `updatePassword()` в `AuthService`, теперь функция принимает `refreshToken`, и передаёт в `setSession({ access_token, refresh_token })` вместо пустой строки;
- теперь `AuthController` пробрасывает `dto.refresh_token` в вызов сервиса

**Backend `SupabaseService` (отрефакторил):**

- добавил второй Supabase-клиент `userClient` на основе `SUPABASE_ANON_KEY`
- добавил getter `userAuth` для пользовательских auth-операций
- теперь существующий `db` (service role key) - только для DB-запросов и `auth.admin.*`
- в `AuthService` перевёл эти четыре вызова на `userAuth`: 
  - `signInWithPassword`, 
  - `resetPasswordForEmail`, 
  - `setSession`, 
  - `updateUser`

**Backend `KeepAliveTask`:**

- добавил проверке `if (this.configService.get('KEEP_ALIVE_ENABLED') !== 'true') return;` в метод `pingRailway()`
- В Railway Variables выставил `KEEP_ALIVE_ENABLED=false` - эта таска теперь не выполняет пинг к серверу, чтобы поддерживать его awake. (из-за неё была проблема с Railway Free 
  Tier limits)

### Проблемы и решения

**Проблема:** Railway Free Tier перестал работать, сервис отказывался обслуживать запросы.
**Причина:** `KeepAliveTask` пинговала `/health` каждые 10 минут, не давая серверу засыпать. Итого получалось примерно ~720 часов/месяц при лимите Free Tier лишь в 500 часов. 
Месячный Лимит кончился бы примерно на 21-й день работы, а дневной и так ушёл в ноль;
**Решение:** Вместо удаления таски добавил пока `env`-переменную `KEEP_ALIVE_ENABLED` в Railway Variables. Условие `!== 'true'` корректно работает со строковыми значениями `env`-переменных: при
`KEEP_ALIVE_ENABLED=false` строка `"false"` будет truthy, поэтому наивная проверка `!configService.get(...)` не сработала бы.

---

**Проблема:** `signUp()` возвращал `409 Conflict: "Failed to create user profile"`. Ошибка появлялась только, если перед регистрацией был вызван `signIn()`.
**Диагностика:** Через Supabase Dashboard → Logs → Postgres нашёл запись: `new row violates row-level security policy for table "profiles"`, `user_name: "authenticator"`. RLS 
(безопасность на уровне строк) нарушалась, хотя `SupabaseService` использует service role key.
**Причина:** `SupabaseService` - синглтон. Вызов `auth.signInWithPassword()` на service role клиенте сохранял пользовательскую сессию в памяти (`persistSession: false` запрещает
запись в хранилище, но не очищает in-memory состояние). Все последующие `from('profiles').insert()` уходили с JWT пользователя вместо service role key → RLS блокировал INSERT.
Та же проблема была и у `auth.setSession()` в методе `updatePassword()`.
**Решение:** Разделил клиент на два:
- `db` (service role key: для DB-операций, и `auth.admin.*`), и 
- `userAuth` (anon key: для пользовательских auth-операций, которые устанавливают или используют сессию).

---

**Проблема:** `POST /auth/update-password` возвращал `401 Unauthorized: "Link may have expired"` сразу после перехода по ссылке из письма, даже если использовалась достаточно 
быстро.
**Причина:** Фронтенд извлекал из URL-хэша только `access_token` и не передавал `refresh_token` (выше я описал процесс решения). Бэкенд вызывал `setSession({ access_token, 
refresh_token: '' })` с пустой строкой. Supabase JSv2 не может устанавливать сессию без валидного refresh token.
**Решение:** Решил на стороне фронтенд дополнительно извлекать `refresh_token` из хэша, сохранять его в сигнал, и передавать в `confirmPasswordReset`. Получилось, что бэкенд 
получает оба токена и передаёт их в `setSession()`.

---

**Проблема:** После перехода по ссылке из письма в адресной строке отображался полный URL с токенами:
`http://localhost:4200/reset-password#access_token=eyJhbG...&refresh_token=fdty2w...&type=recovery`.
**Решение:** в `reset-password.page.ts` добавил хук `ngOnInit()`, в нём описал, что после сохранения токенов в сигналы вызываю `window.history.replaceState({}, '', 
'/reset-password')`. Порядок тут был важен: сначала сохранить токены, и уже потом очищать URL, иначе токены будут потеряны до записи в сигналы.
