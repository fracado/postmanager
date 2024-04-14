<script setup>
import { defineEmits, defineProps, ref, computed, onBeforeUpdate, onUpdated } from "vue";
import useFetch from "@/composables/useFetch";
import ModalDialog from "@/components/ModalDialog.vue";

const props = defineProps({
  isOpen: Boolean,
  type: {
    type: String,
    default: "create",
  },
  authors: {
    type: Array,
    default: () => [],
  },
  id: {
    type: Number || null,
    default: null,
  }
});

const { createPost, getPost, updatePost } = useFetch();
const postId = ref(null);

const formHeaders = {
  create: 'Create blog entry',
  edit: 'Edit blog entry'
};

const submitButtonTexts = {
  create: 'Create',
  edit: 'Save changes'
};

const postTitle = ref("");
const postBody = ref("");
const postAuthor = ref(null);

onBeforeUpdate(() => {
  // to clear form data when modal is closed
  postTitle.value = "";
  postBody.value = "";
  postAuthor.value = null;
});

onUpdated(() => {
  postId.value = props.id;

  if (postId.value) {
    getPost(postId.value).then(async(data) => {
      postTitle.value = await data.title;
      postBody.value = await data.body;
      postAuthor.value = await props.authors.find((author) => author.id === data.userId);
    });
  }
});

const emit = defineEmits(["form-close", "alert-show"]);

const closeForm = () => {
  emit('form-close');
}

const errors = ref({});

const isTitlePresent = computed(() => postTitle.value.trim() !== '');
const isTitleValid = computed(() => postTitle.value.length <= 100);

const isAuthorPresent = computed(() => postAuthor.value !== null);

const isBodyPresent = computed(() => postBody.value.trim() !== '');
const isBodyValid = computed(() => postBody.value.length <= 500);

const validateTitle = () => {
  errors.value.title = !isTitlePresent.value ? 'Title is required.' :
      !isTitleValid.value ? 'Title cannot be longer than 100 characters.' :
          null;
};

const validateAuthor = () => {
  errors.value.author = !isAuthorPresent.value ? 'Author is required.' : null;
};

const validateBody = () => {
  errors.value.body = !isBodyPresent.value ? 'Body is required.' :
      !isBodyValid.value ? 'Body cannot be longer than 500 characters.' :
          null;
};

const validateField = (field) => {
  errors.value[field] = '';
  if (field === 'title') validateTitle();
  if (field === 'author') validateAuthor();
  if (field === 'body') validateBody();
};

const submitForm = async() => {
  errors.value = {};
  validateTitle();
  validateAuthor();
  validateBody();

  if (Object.values(errors.value).every((error) => error === null)) {
    let formData = {
      title: postTitle.value,
      body: postBody.value,
      userId: postAuthor.value?.id,
    }

    if (props.type === 'edit') {
      formData = { id: postId.value, ...formData };
      await updatePost(postId.value, formData).then(() => {
        emit('alert-show', 'success', 'Success!', 'Post updated successfully.');
      }).catch(() => {
        emit('alert-show', 'error', 'Error!', 'Post update failed.');
      })
    } else {
      await createPost(formData).then(() => {
        emit('alert-show', 'success', 'Success!', 'Post created successfully.');
      }).catch(() => {
        emit('alert-show', 'error', 'Error!', 'Post creation failed.');
      });
    }
  } else {
    console.log('validation failed');
  }
};
</script>

<template>
  <ModalDialog :is-open="props.isOpen">
    <form
      :id="`${props.type}-form`"
      class="bg-white rounded pt-2 pb-1"
      @submit.prevent="submitForm"
    >
      <div class="flex justify-between items-center pb-3">
        <p class="text-2xl">
          {{ formHeaders[props.type] }}
        </p>
        <div
          class="form-close cursor-pointer z-50"
          @click.stop="emit('form-close')"
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
      <div class="mb-4">
        <label
          class="block text-sm mb-2"
          for="title"
        >
          Title
        </label>
        <input
          id="title"
          v-model="postTitle"
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          :class="{'border-red-500': errors.title && (!isTitlePresent || !isTitleValid)}"
          type="text"
          @input="validateField('title')"
          @blur="validateField('title')"
        >
        <span
          v-if="errors.title && (!isTitlePresent || !isTitleValid)"
          class="error float-end mt-2 text-red-500 text-xs"
        >
          {{ errors.title }}
        </span>
      </div>
      <div class="mb-6">
        <label
          class="block text-sm mb-2"
          for="author"
        >
          Author
        </label>
        <div class="relative">
          <select
            id="author"
            v-model="postAuthor"
            class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{'border-red-500': errors.author && !isAuthorPresent}"
            @blur="validateField('author')"
          >
            <option
              v-for="author in props.authors"
              :key="author.id"
              :value="author"
            >
              {{ author.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            ><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
          <span
            v-if="errors.author && !isAuthorPresent"
            class="error float-end mt-2 text-red-500 text-xs"
          >
            {{ errors.author }}
          </span>
        </div>
      </div>
      <div class="mb-7">
        <label
          class="block text-sm mb-2"
          for="body"
        >
          Body
        </label>
        <textarea
          id="body"
          v-model="postBody"
          rows="10"
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          :class="{'border-red-500': errors.body && (!isBodyPresent || !isBodyValid)}"
          @input="validateField('body')"
          @blur="validateField('body')"
        />
        <span
          v-if="errors.body && (!isBodyPresent || !isBodyValid)"
          class="error float-end text-red-500 text-xs"
        >
          {{ errors.body }}
        </span>
      </div>
      <hr class="h-px my-2 bg-gray-200 border-0">
      <div class="flex justify-end pt-2">
        <button
          class="border border-1 border-gray-600 form-close px-4 py-2 rounded-lg text-black text-base font-medium hover:text-gray-600 hover:border-gray-400"
          @click.stop="closeForm"
        >
          Close
        </button>
        <button
          id="submit"
          class="focus:outline-none px-4 bg-[#327AB7] py-2 ml-3 rounded-lg text-white text-base font-medium hover:bg-opacity-90"
          @click.stop="submitForm"
        >
          {{ submitButtonTexts[props.type] }}
        </button>
      </div>
    </form>
  </ModalDialog>
</template>