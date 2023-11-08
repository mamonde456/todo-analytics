<template>
  <main>
    hello
    <form @submit.prevent="handleSearchSubmit">
      <select v-model="category">
        <option>제목</option>
        <option>설명</option>
        <option>상태</option>
        <option>날짜</option>
      </select>
      <label for="search">
        <input type="text" name="search" required @input="handleKeyword" />
      </label>
      <input type="submit" value="search" />
    </form>
    <div>
      <span>투두 리스트 타이틀</span>
      <ul v-if="searchList.length > 0">
        <!-- eslint-disable-next-line vue/no-v-for-template-key -->
        <template v-for="item in searchList" :key="item.id">
          <li>
            <span>{{ item.title }}</span>
            <span>{{ item.content }}</span>
            <span>{{ handleDateChange(item.date) }}</span>
            <span>{{ item.status }}</span>
          </li>
        </template>
      </ul>
      <ul v-if="searchList.length <= 0">
        <!-- eslint-disable-next-line vue/no-v-for-template-key -->
        <template v-for="item in todoList" :key="item.id">
          <li @click="handleTodoUpdate(item)">
            <span>{{ item.title }}</span>
            <span>{{ item.content }}</span>
            <span>{{ handleDateChange(item.date) }}</span>
            <span>{{ item.status }}</span>
            <div v-if="isUpdate">
              <div>
                <label for="title">
                  <input
                    type="text"
                    name="title"
                    required
                    :defaultValue="item.title"
                    @input="handleTodoTitle"
                  />
                </label>
                <label for="content">
                  <input
                    type="text"
                    name="content"
                    required
                    :defaultValue="item.content"
                    @input="handleTodoContent"
                  />
                </label>
                <select v-model="status">
                  <option>진행전</option>
                  <option>진행중</option>
                  <option>완료</option>
                </select>
                <VueDatePicker v-model="date" range />
                <input type="submit" value="수정" />
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <form @submit.prevent="handleTodoSubmit">
      <label for="title">
        <input type="text" name="title" required @input="handleTodoTitle" />
      </label>
      <label for="content">
        <input type="text" name="content" required @input="handleTodoContent" />
      </label>
      <select v-model="status">
        <option>진행전</option>
        <option>진행중</option>
        <option>완료</option>
      </select>
      <VueDatePicker v-model="date" range />
      <input type="submit" value="Todo" />
    </form>
  </main>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import { type Category } from "../store/index";
import dayjs from "dayjs";

type Status = "진행전" | "진행중" | "완료";
type TodoDate = Date[] | null;
interface TodoList {
  id: string;
  title: string;
  content: string;
  date: TodoDate;
  status: Status;
}

export default {
  data() {
    return {
      todoList: [] as TodoList[],
      searchList: [] as TodoList[],
      title: "",
      content: "",
      category: "" as Category,
      keyword: "",
      date: null as TodoDate,
      status: "진행전" as Status,
      isUpdate: false,
    };
  },
  computed: {
    handleCategoryChange() {
      return this.$store.state.category;
    },
    validateFormData() {
      if (
        this.title &&
        this.content &&
        this.category &&
        this.date &&
        this.status
      )
        return true;
      return false;
    },
    handleDateChange() {
      return (date: any) => {
        if (date[1]) {
          return `${dayjs(date[0]).format("YYYY-MM-DD")} ~ ${dayjs(
            date[1]
          ).format("YYYY-MM-DD")}`;
        }
        return dayjs(date[0]).format("YYYY-MM-DD");
      };
    },
  },
  watch: {},
  created() {},
  mounted() {
    if (this.$store.state.category) this.category = this.$store.state.category;
    else this.category = "제목";
    this.todoList = this.getTodoList();
    const startDate = new Date();
    this.date = [startDate];
  },

  methods: {
    getTodoList() {
      // 할일 목록 불러오기(API)
      return this.$store.state.dummyData.todoList;
    },
    handleKeyword(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.keyword = inputElement.value;
    },
    handleSearchSubmit() {
      console.log(this.keyword, this.category);
      this.$store.commit("SET_CATEGORY", this.category);
      const categoryType = {
        제목: "title",
        설명: "content",
        상태: "status",
        날짜: "date",
      };
      this.searchList = this.todoList.filter((todo) => {
        if (this.category === "제목") {
          return todo.title.includes(this.keyword);
        } else if (this.category === "설명") {
          return todo.content.includes(this.keyword);
        } else if (this.category === "상태") {
          return todo.status.includes(this.keyword);
        } else if (this.category === "날짜") {
          if (!todo.date) return;
          const stringDate = this.handleDateChange(todo.date);
          // const stringDate = todo.date.map((date: Date) =>
          //   dayjs(date).format("YYYY-MM-DD")
          // );
          return stringDate.includes(this.keyword);
        }
      });
    },
    handleTodoTitle(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.title = inputElement.value;
    },
    handleTodoContent(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.content = inputElement.value;
    },
    handleTodoSubmit() {
      this.todoList.push({
        id: uuidv4(),
        title: this.title,
        content: this.content,
        date: this.date,
        status: this.status,
      });

      if (this.validateFormData) {
        // 할일 추가 api
        return;
      }
    },
    handleTodoUpdate(item: TodoList) {
      this.isUpdate = true;
      const selected = this.todoList.find((el) => el.id === item.id);
      // slice 해서 투두 업데이트
      // input 요소 컴포넌트로 분리
    },
  },
};
</script>
