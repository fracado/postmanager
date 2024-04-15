<script setup>
import AlertComponent from "@/components/AlertComponent.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import PostsList from '@/components/PostsList.vue';
import PostForm from '@/components/PostForm.vue';
import {ref} from "vue";

const isFormOpened = ref(false);
const isConfirmDialogOpened = ref(false);
const isAlertShown = ref(false);
let dialogType = "";
let formType = "";
let postAuthors = [];
let alertType = "";
let alertTitle = "";
let alertText = "";

const postId = ref(null);
const postObj = ref(null);

const openForm = (type, authors, id = null) => {
  formType = type;
  postAuthors = authors;
  postId.value = id;
  isFormOpened.value = true;
};

const closeForm = () => {
  isFormOpened.value = false;
};

const openConfirmDialog = (type, post) => {
  dialogType = type;
  postObj.value = post;
  isConfirmDialogOpened.value = true;
};

const closeConfirmDialog = () => {
  isConfirmDialogOpened.value = false;
};

const showAlert = (type, title, text) => {
  alertType = type;
  alertTitle = title;
  alertText = text;
  isFormOpened.value = false;
  isConfirmDialogOpened.value = false;
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
      <PostsList
        @form-open="openForm"
        @confirm-open="openConfirmDialog"
        @alert-show="showAlert"
      />
    </Suspense>
    <PostForm
      :id="postId"
      :is-open="isFormOpened"
      :type="formType"
      :authors="postAuthors"
      @form-close="closeForm"
      @alert-show="showAlert"
    />
    <AlertComponent
      :is-shown="isAlertShown"
      :type="alertType"
      :title="alertTitle"
      :text="alertText"
      @alert-close="closeAlert"
    />
    <ConfirmDialog
      :is-open="isConfirmDialogOpened"
      :type="dialogType"
      :post="postObj"
      @confirm-close="closeConfirmDialog"
      @alert-show="showAlert"
    />
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
