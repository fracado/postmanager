<script setup>
import {defineEmits, ref} from 'vue';

const emit = defineEmits(["form-open"]);
const tableHeaders = ["Title", "Description", "Author", ""];

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

const getAuthors = () => {
  return [... new Set(posts.value.map(post => post.userId))];
}

</script>

<template>
  <div class="flex flex-col">
    <button
        type="button"
        @click="emit('form-open', 'create', getAuthors())"
        class="ml-auto mr-0 self-end rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Create new post
    </button>
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
        <td class="text-center py-3 px-2">
          <Popper arrow zIndex="inherit">
            <button
                id="menu"
                class="bg-transparent py-2 px-4 rounded inline-flex items-center"
              >
              <span class="mx-auto font-bold text-lg">&#xFE19;</span>
            </button>
            <template #content>
              <div class="flex flex-col">
                <button
                    @click="emit('form-open', 'edit', getAuthors())"
                    class="p-2 my-0.5 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button class="p-2 hover:bg-gray-100">Delete</button>
              </div>
            </template>
          </Popper>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: inherit;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 1px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
