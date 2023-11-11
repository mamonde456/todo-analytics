<template>
  <main class="home-wrapper">
    <div class="form">
      <search-form @getSearchList="getSearchList" />
    </div>
    <div>
      <h1 class="home-title">To-Do List</h1>
      <div class="form">
        <div v-if="!isUpdate" class="home-form-wrapper" @click="handleOpenTodo">
          <plus-icon />
        </div>
        <create-todo
          :isUpdate="isUpdate"
          :btnText="'Todo'"
          @getIsUpdate="getIsUpdate"
        />
      </div>
      <ul v-if="searchList.length > 0" class="home-todo">
        <!-- eslint-disable-next-line vue/no-v-for-template-key -->
        <template v-for="item in searchList" :key="item.id">
          <search-todo :todo="item" />
        </template>
      </ul>
      <ul class="home-todo" v-if="searchList.length <= 0">
        <!-- eslint-disable-next-line vue/no-v-for-template-key -->
        <template v-for="item in getTodo" :key="item.id">
          <todo :todo="item" />
        </template>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import CreateTodo from "../components/todo/CreateTodo.vue";
import Todo from "../components/todo/Todo.vue";
import SearchForm from "../components/search/SearchForm.vue";
import SearchTodo from "../components/search/SearchTodo.vue";
import PlusIcon from "../components/icons/PlusIcon.vue";

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
  components: { CreateTodo, SearchForm, SearchTodo, Todo, PlusIcon },
  data() {
    return {
      todoList: [] as TodoList[],
      searchList: [] as TodoList[], // 검색 결과 리스트
      title: "",
      content: "",

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
      if (this.title && this.content && this.date && this.status) return true;
      return false;
    },

    getTodo() {
      // 할일 목록 불러오기 (vuex에서 state 변경 시 캐치)
      return this.getTodoList();
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.todoList = this.getTodoList();
    // 오늘 기준 날짜
    const startDate = new Date();
    this.date = [startDate];
  },

  methods: {
    getTodoList() {
      // 할일 목록 불러오기
      /* api가 존재할 시에 서버로 리퀘스트.
        const response= await fetch('.../update',{
          method:"GET",
          headers:{"Content-Type":"application/json"},
        })
        const data = await response.json();
      */
      // vuex에 업데이트
      // 현재는 vuex에 있는 더미 데이터 활용
      return this.$store.state.dummyData.todoList;
    },
    getSearchList(searchList: TodoList[]) {
      this.searchList = searchList;
    },
    getIsUpdate(isUpdate: boolean) {
      this.isUpdate = isUpdate;
    },
    handleOpenTodo() {
      this.isUpdate = !this.isUpdate;
    },
  },
};
</script>

<style scoped>
.list {
  background: red;
}
</style>
