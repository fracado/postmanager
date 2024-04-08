<script setup>
import { defineProps, ref } from "vue";

defineProps({
  isOpen: Boolean,
});

const target = ref(null);

</script>

<template>
  <div
    v-if="isOpen"
    class="modal-mask"
  >
    <teleport to="body">
      <div
        ref="target"
        class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
      >
        <div class="flex items-start justify-center min-h-screen pt-24 text-center">
          <div
            ref="modal"
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
            role="dialog"
            aria-modal="true"
            aria-label="modal"
          >
            <slot />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>