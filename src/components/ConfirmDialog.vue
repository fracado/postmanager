<script setup>
import {defineEmits, defineProps, onUpdated, ref} from "vue";
import useFetch from "@/composables/useFetch";
import ModalDialog from "@/components/ModalDialog.vue";

const props = defineProps({
  isOpen: Boolean,
  type: {
    type: String,
    default: "delete",
  },
  post: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["confirm-close", "alert-show"]);
const { deletePost } = useFetch();
const postId = ref(null);
const postTitle = ref("");
const postBody = ref("");

onUpdated(() => {
  if (props.post) {
    postId.value = props.post.id;
    postTitle.value = props.post.title;
    postBody.value = props.post.body;
  }
});

const title = {
  delete: 'Are you sure you want to delete this post?',
};

const closeConfirmDialog = () => {
  emit('confirm-close');
};

const submit = async() => {
  if (props.type !== 'delete') {
    return;
  }

  await deletePost(postId.value).then(() => {
    emit('alert-show', 'success', 'Success!', 'Post deleted successfully.');
  }).catch(() => {
    emit('alert-show', 'error', 'Error!', 'Post deletion failed.');
  })
};
</script>

<template>
  <ModalDialog :is-open="props.isOpen">
    <form
      :id="`${props.type}-form`"
      class="bg-white rounded pt-2 pb-1"
      @submit.prevent="submit"
    >
      <div class="flex justify-between items-center pb-3">
        <p class="text-2xl">
          {{ title[props.type] }}
        </p>
        <div
          class="form-close cursor-pointer z-50"
          @click.stop="emit('confirm-close')"
        >
          <svg
            class="fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>
      <hr class="h-px my-2 bg-gray-200 border-0">
      <div class="rounded overflow-hidden shadow-md my-6">
        <div class="px-6 py-4">
          <div class="font-medium text-lg mb-2">
            {{ postTitle }}
          </div>
          <p class="text-gray-700 text-base">
            {{ postBody }}
          </p>
        </div>
      </div>
      <div
        v-if="props.type === 'delete'"
        class="bg-red-50 border-l-4 border-red-300 text-gray-700 p-4 my-6"
        role="alert"
      >
        <p class="font-bold">
          Attention!
        </p>
        <p>This action cannot be undone.</p>
      </div>
      <hr class="h-px my-2 bg-gray-200 border-0">
      <div class="flex justify-end pt-2">
        <button
          class="border border-1 border-gray-600 form-close px-4 p-3 rounded-lg text-black hover:text-gray-600 hover:border-gray-400"
          @click.stop="closeConfirmDialog"
        >
          Cancel
        </button>
        <button
          class="focus:outline-none px-4 bg-[#327AB7] p-3 ml-3 rounded-lg text-white hover:bg-opacity-90"
          @click.stop="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  </ModalDialog>
</template>