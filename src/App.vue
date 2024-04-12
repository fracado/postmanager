<script setup>
import AlertComponent from "@/components/AlertComponent.vue";
import PostsList from '@/components/PostsList.vue';
import PostForm from '@/components/PostForm.vue';
import {ref} from "vue";

const isFormOpened = ref(false);
const isAlertShown = ref(false);
let formType = "";
let postAuthors = [];
let alertType = "";
let alertTitle = "";
let alertText = "";

const openForm = (type, authors) => {
  formType = type;
  postAuthors = authors;
  isFormOpened.value = true;
};

const closeForm = () => {
  isFormOpened.value = false;
};

const showAlert = (type, title, text) => {
  alertType = type;
  alertTitle = title;
  alertText = text;
  isFormOpened.value = false;
  isAlertShown.value = true;
};

const closeAlert = () => {
  isAlertShown.value = false;
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
    <PostForm :isOpen="isFormOpened" :type="formType" :authors="postAuthors" @form-close="closeForm" @alert-show="showAlert" />
    <AlertComponent :isShown="isAlertShown" :type="alertType" :title="alertTitle" :text="alertText" @alert-close="closeAlert" />
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
