<script setup>
import { ref } from 'vue';
import ModalDialog from './ModalDialog.vue';

const tableHeaders = ["Title", "Description", "Author"];

const posts = ref(null);
await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      if (response.status !== 200) {
        throw response.status;
      } else {
        return response.json();
      }
    })
    .then(async(data) => posts.value = await data);

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
};

const submitHandler = () => {
  console.log('submit');
}

const modalTitle = 'dummy title';
const modalBody = 'dummy body';
</script>

<template>
  <div class="flex flex-col">
    <button
        type="button"
        @click="openModal"
        class="ml-auto mr-0 self-end rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Open Modal
    </button>
    <ModalDialog :isOpen="isModalOpened" :title="modalTitle" :body="modalBody" @modal-close="closeModal" @submit="submitHandler" />
    <table id="posts-list" class="table-auto border-collapse border border-slate-500 text-sm mt-6">
      <thead class="bg-gray-700 text-white">
      <tr>
        <th v-for="header in tableHeaders" :key='header' class="w-1/3 py-3 font-semibold">
          {{header}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key='post' class="odd:bg-white even:bg-gray-200">
        <td class="text-center first-letter:uppercase py-3 px-2">{{post.title}}</td>
        <td class="text-left first-letter:uppercase py-3 px-2">{{post.body}}</td>
        <td class="text-center py-3 px-2">User #{{post.userId}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
