<script setup>
import PostsList from '@/components/PostsList.vue';
import PostForm from '@/components/PostForm.vue';
import {ref} from "vue";

const isFormOpened = ref(false);
let formType = "";
let postAuthors = [];

const openForm = (type, authors) => {
  formType = type;
  postAuthors = authors;
  isFormOpened.value = true;
};

const closeForm = () => {
  isFormOpened.value = false;
};

</script>

<template>
  <header>
    <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">
      Post Manager
    </h2>
  </header>
  <main>
    <Suspense>
      <template #fallback>
        <div>Loading...</div>
      </template>
      <PostsList @form-open="openForm" />
    </Suspense>
    <PostForm :isOpen="isFormOpened" :type="formType" :authors="postAuthors" @form-close="closeForm" />
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
