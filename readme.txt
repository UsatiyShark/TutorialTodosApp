Реализовано приложение todo-лист по следующим этапам:
1) развернуто приложение Vue3 с использованием ts;
2) верстка распределена по компонентам;
3) добавлен функционал смены состояния карточки задачи;
4) добавлен функционал удаления задачи;
5) описана логика добавления задачи через форму - разгружен компонент AppTodoList.vue, массив задач и методы перенесены в компонент App.vue;
6) реализована фильтрация задач и статистика в футере.

Была проведена работа по типизации пропсов и описанию интерфейсов с использованием PropType, были типизированы emits, использованы слушатели событий (в том числе с модификаторами) с описанием методов. Использовались: добавление классов, интерполяция {{ }}, вынесение типов в отдельные файлы, vue devtools, директивы v-for, v-if, v-else, двустороннее связывание с помощью v-model, computed properties (поле computed в defineComponent).

Подробнее - в файле guide.docx

Обновления: 21.04.25 После первого коммита производилась разработка серверной части приложения с помощью фреймворка fastify. Клиентская часть была перенесена на фреймворк Nuxt3. Ее взаимодействие с северной частью реализовано с помощью axios. Описаны следующие методы REST API: GET, POST, PUT, DELETE. Базовый URL серверного API вынесен в отдельный файл connections.ts. В качестве БД используется SQLite.
22.04.25 Переработана файловая структура клиентской части на Nuxt3 - изменения коснулись файлов app.vue и index.vue. Также было принято решение вынести серверную часть в отдельный репозиторий: https://github.com/UsatiyShark/TodosAppServer. Соответственно из текущего репозитория были убраны зависимости fastify, @fastify/cors, sqlite3. 
 
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
