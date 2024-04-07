<script setup>
import PostsList from './components/PostsList.vue';
</script>

<template>
  <header>
    <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">
      Post Manager
    </h2>
  </header>
  <main>
    <PostsList />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header h1 {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
  }
}
</style>
