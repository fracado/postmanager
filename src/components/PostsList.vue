<script setup>
import { ref } from 'vue';

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
</script>

<template>
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
</template>
