<template>
  <div
    v-if="isUpdate"
    :class="btnText === 'Update' && isUpdate && 'todo-form-wrapper'"
  >
    <form class="todo-form" @submit.prevent="handleTodoSubmit">
      <VueDatePicker class="date-picker" v-model="date" range />
      <label for="title">
        <input
          class="todo-input todo-title"
          ref="titleRef"
          type="text"
          name="title"
          required
          @input="handleTodoTitle"
          :defaultValue="todo?.title"
        />
      </label>
      <label for="content">
        <input
          class="todo-input todo-content"
          ref="contentRef"
          type="text"
          name="content"
          required
          @input="handleTodoContent"
          :defaultValue="todo?.content"
        />
      </label>
      <select class="todo-select" v-model="status">
        <option>진행전</option>
        <option>진행중</option>
        <option>완료</option>
      </select>
      <div class="todo-btn-wrapper">
        <input class="todo-btn" type="submit" :value="btnText" />
        <input class="todo-btn" value="취소" @click.prevent="handleCancel()" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import {
  type Status,
  type TodoDate,
  type TodoList,
  type Category,
} from "../../store/index";

export default {
  props: {
    isUpdate: Boolean,
    todo: Object,
    btnText: String,
  },
  data() {
    return {
      todoList: [] as TodoList[],
      title: "",
      content: "",
      category: "" as Category,
      keyword: "",
      date: null as TodoDate,
      status: "진행전" as Status,
    };
  },
  computed: {
    validateFormData() {
      if (this.title && this.content && this.date && this.status) return true;
      return false;
    },
  },
  watch: {},
  created() {},
  mounted() {
    if (this.todo) {
      this.status = this.todo.status;
      this.date = this.todo.date;
    }
  },

  methods: {
    handleTodoTitle(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.title = inputElement.value;
    },
    handleTodoContent(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.content = inputElement.value;
    },
    handleTodoSubmit() {
      if (this.btnText === "Update") return this.updateTodoSubmit();
      if (this.btnText === "Todo") return this.createTodoSubmit();
    },
    createTodoSubmit() {
      if (this.validateFormData) {
        // 할일 추가
        /* api가 존재할 시에 서버로 리퀘스트.
        const response= await fetch('.../create',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({...})
        })
        const data = await response.json();
        */
        // vuex에 추가
        this.$store.dispatch("updateTodoList", {
          id: uuidv4(),
          title: this.title,
          content: this.content,
          date: this.date,
          status: this.status,
        });
        this.resetTodo();
      }
    },
    updateTodoSubmit() {
      // 할일 수정
      const todo = this?.todo;
      if (todo) {
        const todoList = this.$store.state.dummyData.todoList;
        const index = todoList.findIndex((el: TodoList) => el.id === todo.id);
        const newTodo = [
          {
            id: todo.id ? todo.id : uuidv4(),
            title: this.title ? this.title : todo.title,
            content: this.content ? this.content : todo.content,
            date: this.date ? this.date : todo.date,
            status: this.status ? this.status : todo.status,
          },
        ];
        const prevTodoList = todoList.slice(0, index);
        const lastTodoList = todoList.slice(index + 1);
        const newTodoList = prevTodoList.concat(newTodo, lastTodoList);
        // 할일 수정 api 요청
        /* api가 존재할 시에 서버로 리퀘스트.
        const response= await fetch('.../update',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({...})
        })
        const data = await response.json();
        */
        // vuex에 업데이트
        this.$store.dispatch("updateTodoList", newTodoList);
        this.$emit("getCancel", true);
        this.resetTodo();
      }
    },
    resetTodo() {
      this.title = "";
      (this.$refs!.titleRef as HTMLInputElement).value = "";
      (this.$refs!.contentRef as HTMLInputElement).value = "";
      this.content = "";
      this.date = null;
    },
    handleCancel() {
      if (this.btnText === "Update") return this.$emit("getCancel", true);
      if (this.btnText === "Todo") return this.$emit("getIsUpdate", false);
    },
  },
};
</script>
