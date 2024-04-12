<script setup>
import {defineEmits, defineProps, onUpdated, ref} from "vue";

const props = defineProps({
  isShown: Boolean,
  type: {
    type: String,
    default: "info",
  },
  title: {
    type: String,
    default: "Oops!",
  },
  text: {
    type: String,
    default: "Something went wrong.",
  },
});

const successAlert = ref(false);
const errorAlert = ref(false);

onUpdated(() => {
  if (props.type === 'success') {
    successAlert.value = true;
    errorAlert.value = false;
  } else {
    errorAlert.value = true;
    successAlert.value = false;
  }
});

const emit = defineEmits(["alert-close"]);

</script>
<template>
  <div v-if="isShown">
    <div class="fixed inset-0 flex px-4 py-6 m-10 p-6 items-start justify-center">
      <div
        class="w-96 border px-4 py-3 rounded relative"
        :class="{'bg-green-100 border-green-400 text-green-700': successAlert, 'bg-red-100 border-red-400 text-red-700': errorAlert}"
        role="alert"
      >
        <div
          class="absolute top-0 bottom-0 right-0 px-4 py-3"
          @click="emit('alert-close')"
        >
          <svg
            class="fill-current h-6 w-6 cursor-pointer"
            :class="{'text-green-500': successAlert, 'text-red-500': errorAlert}"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </div>
        <p><strong class="font-bold">{{ title }}</strong></p>
        <p class="block sm:inline">
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>
