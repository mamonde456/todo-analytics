<template>
  <li class="todo-wrapper">
    <div class="todo">
      <span>{{ todo?.title }}</span>
      <span>{{ todo?.content }}</span>
      <span>{{ handleDateChange(todo?.date) }}</span>
      <span :class="handleStatus">{{ todo?.status }}</span>
    </div>
  </li>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { type Status } from "../../store";
export default {
  props: {
    todo: Object,
  },
  computed: {
    handleTodoShow() {
      if (this.todo) {
        const keys = Object.keys(this.todo);
        if (keys.length > 0) return true;
        else return false;
      }
    },
    handleStatus() {
      console.log(this.todo);
      const statusType: { [key in Status]: string } = {
        진행전: "yellow",
        진행중: "blue",
        완료: "aquamarine",
      };
      return statusType[this.todo?.status as Status];
    },
    handleDateChange() {
      return (date: any) => {
        console.log(date);
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
};
</script>
