Реализовано приложение todo-лист по следующим этапам:
1) развернуто приложение Vue3 с использованием ts;
2) верстка распределена по компонентам;
3) добавлен функционал смены состояния карточки задачи;
4) добавлен функционал удаления задачи;
5) описана логика добавления задачи через форму - разгружен компонент AppTodoList.vue, массив задач и методы перенесены в компонент App.vue;
6) реализована фильтрация задач и статистика в футере.

Была проведена работа по типизации пропсов и описанию интерфейсов с использованием PropType, были типизированы emits, использованы слушатели событий (в том числе с модификаторами) с описанием методов. Использовались: добавление классов, интерполяция {{ }}, вынесение типов в отдельные файлы, vue devtools, директивы v-for, v-if, v-else, двустороннее связывание с помощью v-model, computed properties (поле computed в defineComponent).

Подробнее - в файле guide.docx

# todos

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).