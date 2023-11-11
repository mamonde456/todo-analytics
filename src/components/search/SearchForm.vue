<template>
  <form class="search-form" @submit.prevent="handleSearchSubmit">
    <select class="search-select" v-model="category">
      <option>제목</option>
      <option>설명</option>
      <option>상태</option>
      <option>날짜</option>
    </select>
    <label for="search">
      <input
        class="search-input"
        type="text"
        name="search"
        required
        @input="handleKeyword"
      />
    </label>
    <button class="search-btn" type="submit" aria-label="Search">
      <search-icon />
    </button>
  </form>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { type Category, type TodoList } from "../../store";
import SearchIcon from "../icons/SearchIcon.vue";
export default {
  components: { SearchIcon },
  data() {
    return {
      todoList: [] as TodoList[],

      category: "" as Category, // 제목, 설명, 상태, 날짜
      keyword: "", // 검색어
    };
  },
  computed: {
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
    getTodoList() {
      return this.$store.state.dummyData.todoList;
    },
  },
  watch: {
    getTodoList: {
      handler(newValue: TodoList[]) {
        this.todoList = newValue;
      },
      deep: true,
    },
  },
  mounted() {
    if (this.$store.state.category) this.category = this.$store.state.category;
    else this.category = "제목";
    this.todoList = this.$store.state.dummyData.todoList;
  },
  methods: {
    handleKeyword(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.keyword = inputElement.value;
    },
    handleSearchSubmit() {
      this.$store.commit("SET_CATEGORY", this.category);
      const categoryType = {
        제목: (todo: TodoList) => todo.title.includes(this.keyword),
        설명: (todo: TodoList) => todo.content.includes(this.keyword),
        상태: (todo: TodoList) => todo.status.includes(this.keyword),
        날짜: (todo: TodoList) => {
          const stringDate = this.handleDateChange(todo.date);
          return stringDate?.includes(this.keyword);
        },
      };
      const searchList = this.todoList.filter((todo: TodoList) => {
        if (categoryType[this.category])
          return categoryType[this.category](todo);
      });
      this.$emit("getSearchList", searchList);
    },
  },
};
</script>
