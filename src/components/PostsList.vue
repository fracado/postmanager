<script setup>
import {defineEmits, ref} from 'vue';
import useFetch from "@/composables/useFetch";

const emit = defineEmits(["form-open", "confirm-open", 'alert-show']);
const tableHeaders = ["Title", "Description", "Author", ""];
const { getPosts, getUsers } = useFetch();

const posts = ref(null);
const users = ref(null);

await getUsers().then(async(data) => {
  users.value = await data.map((user) => {
    return {
      id: user.id,
      name: user.username,
    };
  });
}).catch(() => {
  emit('alert-show', 'error', 'Error!', 'Users could not be loaded');
});

await getPosts().then(async(data) => {
  posts.value = await data;
}).catch(() => {
  emit('alert-show', 'error', 'Error!', 'Posts could not be loaded.');
});

</script>

<template>
  <div class="flex flex-col">
    <button
      type="button"
      class="ml-auto mr-0 self-end rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      @click="emit('form-open', 'create', users)"
    >
      Create new post
    </button>
    <table
      id="posts-list"
      class="table-auto border-collapse border border-slate-500 text-sm mt-6"
    >
      <thead class="bg-gray-700 text-white">
        <tr>
          <th
            v-for="header in tableHeaders"
            :key="header"
            class="w-1/3 py-3 font-semibold"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts"
          :key="post"
          class="odd:bg-white even:bg-gray-200"
        >
          <td class="text-center first-letter:uppercase py-3 px-2">
            {{ post.title }}
          </td>
          <td class="text-left first-letter:uppercase py-3 px-2">
            {{ post.body }}
          </td>
          <td class="text-center py-3 px-2">
            {{ users.find(user => user.id === post.userId ).name }}
          </td>
          <td class="text-center py-3 px-2">
            <Popper
              arrow
              z-index="inherit"
            >
              <button
                id="menu"
                class="bg-transparent py-2 px-4 rounded inline-flex items-center"
              >
                <span class="mx-auto font-bold text-lg">&#xFE19;</span>
              </button>
              <template #content>
                <div class="flex flex-col">
                  <button
                    class="p-2 my-0.5 hover:bg-gray-100"
                    @click="emit('form-open', 'edit', users, post.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="p-2 my-0.5 hover:bg-gray-100"
                    @click="emit('confirm-open', 'delete', post)"
                  >
                    Delete
                  </button>
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
