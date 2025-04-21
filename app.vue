<template>
  <AppHeader />
  <AppFilters :active-filter="activeFilter" @set-filter="setFilter"/>
  <main class="app-main">
    <AppTodoList :todos="filteredTodos" @toggle-todo="toggleTodo" @remove-todo="removeTodo"/>
    <AppAddTodo/>
  </main>
  <AppFooter :stats="stats"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppHeader from '~/components/AppHeader.vue';
import AppFilters from '~/components/AppFilters.vue';
import AppTodoList from '~/components/AppTodoList.vue';
import AppAddTodo from '~/components/AppAddTodo.vue';
import AppFooter from '~/components/AppFooter.vue';
import { type Stats } from '~/components/AppFooter.vue';
import { type Todo } from '~/types/Todo';
import { type Filter } from '~/types/Filter';
import axios from 'axios';
import { path } from '~/connections'

interface State {
todos: Todo[],
activeFilter: Filter
}

export default defineComponent({
components: {
AppHeader,
AppFilters,
AppTodoList,
AppAddTodo,
AppFooter
},
data(): State {
    return {
        todos:[],
        activeFilter: 'All'
    }
},
computed: {
filteredTodos(): Todo[] {
  switch (this.activeFilter) {
    case 'Active':
      return this.activeTodos
    case 'Done':
      return this.doneTodos
    case 'All':
    default:
      return this.todos
  }
},
stats(): Stats {
  return {
    active: this.activeTodos.length,
    done: this.doneTodos.length
  }
},
activeTodos(): Todo[] {
  return this.todos.filter(todo => !todo.completed)
},
doneTodos(): Todo[] {
  return this.todos.filter(todo => todo.completed)
}
},
methods: {
async fetchTodos() {
  try {
      // Отправка GET-запроса на сервер с помощью Axios
      const response = await axios.get(`${path}/Todosdb`);

      // Преобразование полученных данных в массив объектов типа Todo
      this.todos = response.data.map((task: any) => ({
          id: task.id,
          text: task.name,
          completed: task.status === 'true',
      })) as Todo[];

      await this.fetchTodos();

  } catch (error) {
      console.error(error);
      // Если ошибка связана с ответом сервера, получаем больше информации
      if (axios.isAxiosError(error)) {
          console.error('Ошибка от сервера:', error.response?.data);
      }
  }
},
async toggleTodo(id: number) {
    try {
    // Нахождение целевой задачи
    const targetTodo = this.todos.find((todo: Todo) => todo.id === id);

    if (targetTodo) {
          const newStatus = !targetTodo.completed;

          // Отправка PUT-запроса на сервер для обновления статуса задачи
          const response = await axios.put(`${path}/Todosdb/${id}`, {
              completed: newStatus
          });

          // Обновление статуса задачи в локальном массиве с использованием метода map
          this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, completed: response.data.completed} : todo
          );

          // Обработка ответа от сервера
          console.log(response.data.message);
      }
    } catch (error) {
        console.error(error);
        // Если ошибка связана с ответом сервера, получаем больше информации
        if (axios.isAxiosError(error)) {
            console.error('Ошибка от сервера:', error.response?.data);
        }
    }
},
async removeTodo(id: number) {
  try {
      // Отправка DELETE-запроса на сервер с помощью Axios
      const response = await axios.delete(`${path}/Todosdb/${id}`);

      // Обновление списка задач (без удалённой)
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);

      // Обработка ответа от сервера
      console.log(response.data.message);

  } catch (error) {
      console.error(error);
      // Если ошибка связана с ответом сервера, получаем больше информации
      if (axios.isAxiosError(error)) {
          console.error('Ошибка от сервера:', error.response?.data);
      }
  } 
},
setFilter(filter: Filter) {
  this.activeFilter = filter
}
},
mounted() {
this.fetchTodos(); // Получение задач при монтировании компонента
}
})
</script>


