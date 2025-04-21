<template>
    <section class="add-todo">
        <form v-if="isFormVisible" class="add-todo__form" @submit.prevent="addTodo">
            <button class="close-button" type="button" @click="closeForm">
              <i class="bi bi-x"></i>
            </button>
            <div class="text-input text-input--focus">
              <input v-model="todoText" class="input" />
            </div>
           <button class="button button--filled">Add task</button>
        </form>
        <button v-else class="add-todo__show-form-button" @click="showForm">
            <i class="bi bi-plus-lg"></i>
        </button>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { type Todo } from '@/types/Todo';
import axios from 'axios';
import { path } from '@/connections';

interface State {
  isFormVisible: boolean,
  todoText: string
}

export default defineComponent({
  data(): State {
    return {
      isFormVisible: false,
      todoText: '',
    }
  },
  methods: {
    showForm() {
      this.isFormVisible = true
    },
    closeForm() {
      this.isFormVisible = false
    },
    async addTodo(): Promise<void> {
      try {
        const response = await axios.post(`${path}/Todosdb`, {
          id: Date.now(),
          name: this.todoText, 
          completed: false,
        });
  
        console.log(response.data.message); // Сообщение об успешном добавлении

        // Очистка поля ввода
        this.todoText = '';
        this.closeForm(); // Закрытие формы после добавления задачи
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Ошибка при добавлении задачи:', error.response?.data.message || error.message);
        } else {
          console.error('Неизвестная ошибка:', error);
        }
      }
    }
  },
  emits: {
    addTodo: (todo: Todo) => todo,
  },
})
</script>