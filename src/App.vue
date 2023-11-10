<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import type { Fragment } from "vue/jsx-runtime";
</script>

<template>
  <Fragment>
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="main-wrapper">
      <span class="main-title">Hello, To-Do</span>
    </div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">List</RouterLink>
          <RouterLink to="/statistics">Statistics</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </Fragment>
</template>

<style scoped>
header {
  /* margin: 0 auto; */
  display: flex;
  justify-content: center;
}

nav {
  font-size: 16px;
}

nav a.router-link-exact-active {
  color: rgb(54, 255, 188);
  font-weight: var(--basic-black);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  color: var(--color-text);
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
