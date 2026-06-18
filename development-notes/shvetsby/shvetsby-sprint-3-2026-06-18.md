# Возвращаемся к домашней странице

Эту страницу я начинал делать, самое время ее закончить. Для начала иду в задание, смотрю что уже есть.

### Popular Tracks

[x] Display a "Popular Tracks" section — a list of 10–15 tracks sorted by popularity. Data loaded from Jamendo API (GET /v3.0/tracks?order=popularity_total).
[x] Each track is displayed as a card: album cover, title, artist name, duration (in mm:ss format).
Play count is displayed in abbreviated form (e.g., 1,234,567 → 1.2M).
A Play button on each card — clicking it starts playback in the player.
If a track is already playing — visual indication (e.g., equalizer bars animation or card highlight).

### New Releases

[x] A "New Releases" section — a list of 10 tracks sorted by date (GET /v3.0/tracks?order=releasedate_desc).
[x] Card format is the same as Popular Tracks.

### Genre Tags

[x] A block with genre tags (rock, electronic, jazz, pop, etc.).
[x] Clicking a tag navigates to the Search page with a filter for that tag.

Начинаем с тегов, самая простая часть. Поиск уже готов, реализация понятная.
Но, как оказалось, не все так просто.

сейчас у нас есть поисковая строка, которая принимает запрос. Если сть запрос — идем на поиск
получаем результаты и можем их отфильтровать по жанрам. Фильтрация по жанрам происходит на беке. По сути есть выбиралка жанров, которые добавляются к запросу на бек и получаем результат, который с сожержит исходный запрос + фильтрацию

В случае с кликом по жанру, должен сработать переход а страницу поиска и и активация тега. Кажется проще всего сделать так, чтобы все параметры поиска хранились в url

В компоненте с жанрами добавялем аутпут, который передает родителю выбранный жанр. Окзалось ангуляр трепетная роза, и в отличие от реакта, ругается если на див обработчики вешать.

В родителя инжектим роутер, чтобы в запрос появилось что-ти типа `?tags=Electronic`

С этим уже можно работать в компоненте поиска.

В компоненте поиска уже есть выбиралка тега. в том блоке кода, который разбирает адресную строку достаем теперь еще и теги. Сетаем отмеченный тег в выбиралку.

В методе с запросом в сервис, меняем логику, чтобы он отключался, если нет запроса, и поиск с жанром запускался.

Поменял html шаблон, чтобы компоненты в обратывались с новой логикой.
