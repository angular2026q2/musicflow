## Entry #14

**createdAt:** 31 May 2026

### Задачи и мысли (планы)

Так как "ручки" уже были расписаны на бэке, то задача стояла реализовать UI для авторизации пользователей на фронте: я решил пойти не через роуты и страницы, а создать модальные
окна `Sign In`, `Sign Up` и, как бонус, потому что сервис это позволяет – `Forgot Password` (для сброса пароля, если пользователь забыл его). Подключить всё это к backend,
настроить хранение JWT токена и реактивное состояние пользователя через сигналы.

### Реализация

**Инфраструктура авторизации:**

- `TokenService` – хранение JWT. Поддерживает два режима:
  - `persistent = true` ("Keep me signed in") → `localStorage` (переживает перезапуск сессии)
  - `persistent = false` → `sessionStorage` (очищается при закрыти сессии)
  - Проверяет оба хранилища при чтении: сначала `sessionStorage`, потом `localStorage`
- `AuthService` – сигналы `currentUser`, `isAuthenticated`, `isGuest`. Методы `signIn`, `signUp`, `signOut`, `resetPassword`, `loadCurrentUser`. При старте приложения
  автоматически восстанавливает сессию если токен существует
- `ModalService` – управление активным модальным окном через `signal<ModalType>`
- `authInterceptor` – читает токен из `TokenService`, подставляет `Authorization` заголовок, заменяет относительный `/api/` путь на абсолютный URL из `environment`

> В процессе реализации выяснилось, что три модальных окна содержат много повторяемого кода (логика, разметка, стили). Провёл рефакторинг мелкими кусками кода после того, как всё
> было в рабочем состоянии и проверено.

**Модальные окна:**

- Все три компонента (`SignInModal`, `SignUpModal`, `ForgotPasswordModal`) построены на Reactive Forms (`FormBuilder.nonNullable.group`)
- `SignInModal` – имеет поля `email` и `password` (использовал UI PrimeNG `p-password` и `[toggleMask]="true"`), чекбокс "**Keep me signed in**", ссылкии на **Forgot
  Password** и **Sign Up**
- `SignUpModal` – содержит поля `full_name`, `username`, `email`, `password`
- `ForgotPasswordModal` – тут только одно поле `email`, будет отправлться запрос на `POST /api/v1/auth/reset-password`
- Все модалки рендерятся в `AppComponent` через `@switch` поверх overlay с `backdrop-filter: blur`

**Переиспользуемые компоненты форм:**

- `FormFieldComponent` – label + иконка + input + error text. Принимает `icon: IconKey` (строковый ключ из реестра `ICONS`), внутри резолвит через `computed(() => ICONS[this.
icon()])`. Заменил `AbstractControl` на `FormControl` – убрал `$any()` из шаблона
- `SubmitButtonComponent` – кнопка `type="submit"` со спиннером `p-progressSpinner`. Принимает `label`, `isLoading`, `disabled`

**Рефакторинг – `BaseAuthModal`:**

- Абстрактный базовый класс, аналог React хука для переиспользования логики
- Содержит: `ModalService`, `MessageService`, `isLoading`, `ICONS`, методы `close()`, `switchTo()`, `showError()`, `showSuccess()`
- Все три компонента наследуют `BaseAuthModal` и содержат только уникальную логику

**SCSS миксины** (`src/styles/_mixins.scss`):

- `modal-container`, `modal-header`, `modal-title`, `modal-heading`, `modal-subtitle`
- `modal-form($gap)`, `modal-footer($gap)`, `modal-footer-link`, `modal-switch-text`
- `modal-close-position`, `modal-error-text($min-height)`

### Проблемы и решения

**Проблема:** Backend возвращал `{ accessToken: '...' }` (camelCase), а фронтенд ожидал `access_token` (snake_case), и токен сохранялся как строка `"undefined"`,
соответственно запрос на `/auth/me` падал с 401.
**Решение:** Исправил тип ответа в `AuthService` с `{ access_token: string }` на `{ accessToken: string }`.

**Проблема:** `SignUpDto` на backend не содержал поле `full_name`, а запрос регистрации возвращал `400 Bad Request: property full_name should not exist`.
**Решение:** Добавил `full_name?: string | null` с `@IsOptional()` в `SignUpDto` на backend, задеплоил на Railway.

**Проблема:** Backend, при регистрации нового пользователя, возвращал `409 Conflict: Failed to create user profile`. Как оказалось, поле `username` использовалось как
уникальный идентификатор, и при повторных тестах старые записи в таблице `profiles` блокировали создание новых.
**Решение:** Очистил таблицу `profiles` в Supabase, добавил поле `username` в форму `SignUp` на фронтенде вместо подстановки email. Наверное, если будет время, нужно будет
переписать форму `SignIn`, чтобы пользователь мог вводить не только свою почту, но и просто ник.

**Проблема:** `p-password` и `p-iconfield` конфликтовали между собой, кликнуть мышкой в поле пароля было невозможно, "глазик" не работал.
**Решение:** Отказался от использования `p-iconfield` для поля password, иконку замочка добавил через абсолютное позиционирование в CSS. `p-password` используется отдельно.

**Проблема:** Появление/исчезновение текста ошибки при валидации полей, вызывало "прыжки" высоты формы.
**Решение:** Зарезервировал высоту через `min-height` в миксине `modal-error-text`. Блок всегда занимает место, даже когда текст пустой.

**Проблема:** Клик внутри модалки всплывал до overlay и закрывал её.
**Решение:** Добавил `host: { '(click)': '$event.stopPropagation()' }` в декоратор каждого компонента модалки.

**Проблема:** временно устанавливал `$any()` в шаблоне универсального компонента `FormFieldComponent`, что отключало проверку типов для `[formControl]`.
**Решение:** Заменил тип `control` с `AbstractControl` на `FormControl`.

**Проблема:** Три модальных окна содержали одинаковые `inject()`, сигналы, методы навигации и toast вызовы.
**Решение:** Создал абстрактный базовый класс `BaseAuthModal` в `@core/components/auth/`.

**Проблема:** Десятки строк дублирующегося SCSS во всех трёх компонентах.
**Решение:** создал SCSS миксины с параметрами по умолчанию там, где компоненты отличаются или могут меняться, – передаю аргумент вместо переопределения.
