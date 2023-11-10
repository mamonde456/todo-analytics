<template>
  <li class="todo-wrapper">
    <div v-if="isOpen" class="todo" @click="handleTodoOpen(todo?.id)">
      <span>{{
        todo?.title.length > 30 ? todo?.title.slice(0, 30) + "..." : todo?.title
      }}</span>
      <span>{{
        todo?.content.length > 30
          ? todo?.content.slice(0, 30) + "..."
          : todo?.content
      }}</span>
      <span>{{ handleDateChange(todo?.date) }}</span>
      <span :class="handleStatus">{{ todo?.status }}</span>
    </div>
    <div class="update-form-container">
      <create-todo
        :isUpdate="todo?.id === editingId"
        :todo="todo"
        :btnText="'Update'"
        @getCancel="getCancel"
      />
    </div>
  </li>
</template>

<script lang="ts">
import dayjs from "dayjs";
import CreateTodo from "./CreateTodo.vue";
import { type Status } from "../../store";
import MenuIcon from "../icons/MenuIcon.vue";
export default {
  components: { CreateTodo, MenuIcon },
  props: {
    todo: Object,
  },
  data() {
    return {
      editingId: "",
      isOpen: true,
    };
  },
  computed: {
    handleStatus() {
      const statusType: { [key in Status]: string } = {
        진행전: "yellow",
        진행중: "blue",
        완료: "aquamarine",
      };
      return statusType[this.todo?.status as Status];
    },
    handleDateChange() {
      return (date: any) => {
        if (!date) return;
        if (date[1]) {
          return `${dayjs(date[0]).format("YYYY-MM-DD")} ~ ${dayjs(
            date[1]
          ).format("YYYY-MM-DD")}`;
        }
        return dayjs(date[0]).format("YYYY-MM-DD");
      };
    },
  },
  methods: {
    handleTodoOpen(id: string) {
      if (this.editingId === id) return (this.editingId = "");
      this.editingId = id;
      this.isOpen = false;
    },
    getCancel(isCancel: boolean) {
      this.isOpen = isCancel;
      this.editingId = "";
    },
  },
};
</script>
