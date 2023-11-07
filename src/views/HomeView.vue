<template>
  <main>
    hello
    <div>
      <span>투두 리스트 타이틀</span>
      <ul>
        <li>투두 리스트</li>
        <li>투두 리스트</li>
        <li>투두 리스트</li>
        <li>투두 리스트</li>
      </ul>
    </div>
    <form @submit.prevent="(event) => handleSearchSubmit(event)">
      <select v-model="category">
        <option>제목</option>
        <option>설명</option>
        <option>상태</option>
        <option>날짜</option>
      </select>
      <label for="search">
        <input type="text" name="search" v-model="keyword" />
      </label>
      <input type="submit" value="search" />
    </form>
  </main>
</template>

<script lang="ts">
export default {
  setup() {},
  data() {
    return {
      todoList: [],
      text: "",
      category: "",
      keyword: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.category = this.$store.
    if (this.$store.state.category) this.category = this.$store.state.category;
    console.log(this.$store.state.category);
  },

  methods: {
    handleSearchSubmit(e: Event) {
      console.log(this.keyword, this.category);
    },
  },
};
</script>
