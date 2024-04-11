<script setup>
import {defineEmits, defineProps} from "vue";
import ModalDialog from "@/components/ModalDialog.vue";

const props = defineProps({
  isOpen: Boolean,
  type: String,
  authors: Array,
});

const formHeaders = {
  create: 'Create blog entry',
  edit: 'Edit blog entry'
};

const submitButtonTexts = {
  create: 'Create',
  edit: 'Save changes'
};

const emit = defineEmits(["form-close"]);

const closeForm = () => {
  emit('form-close');
}

</script>

<template>
  <ModalDialog :isOpen="props.isOpen">
    <form
      :id="`${props.type}-form`"
      class="bg-white rounded pt-2 pb-1"
      >
      <div class="flex justify-between items-center pb-3">
        <p class="text-2xl">
          {{ formHeaders[props.type] }}
        </p>
        <div @click.stop="emit('form-close')" class="form-close cursor-pointer z-50">
          <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
      </div>
      <hr class="h-px my-2 bg-gray-200 border-0">
      <div class="mb-4">
        <label class="block text-sm mb-2" for="title">
          Title
        </label>
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
        >
      </div>
      <div class="mb-6">
        <label class="block text-sm mb-2" for="author">
          Author
        </label>
        <div class="relative">
          <select class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="author">
            <option
                v-for="(author, index) in props.authors"
                :key="index"
                :value="author"
            >
              User #{{ author }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div class="mb-8">
        <label class="block text-sm mb-2" for="body">
          Body
        </label>
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            type="text"
        >
      </div>
      <hr class="h-px my-2 bg-gray-200 border-0">
      <div class="flex justify-end pt-2">
        <button @click.stop="closeForm"
                class="border border-1 border-gray-600 form-close px-4 p-3 rounded-lg text-black hover:text-gray-600 hover:border-gray-400"
        >
          Close
        </button>
        <button @click.stop="closeModal"
                class="focus:outline-none px-4 bg-[#327AB7] p-3 ml-3 rounded-lg text-white hover:bg-opacity-90"
        >
          {{ submitButtonTexts[props.type] }}
        </button>
      </div>
    </form>
  </ModalDialog>
</template>