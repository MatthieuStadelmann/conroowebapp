<template>
  <button
    :class="computedClass"
    v-bind="{ ...$attrs }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  VARIANT_PRIMARY,
  VARIANT_SECONDARY,
} from "../../constants/variants.ts";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});

const computedClass = computed(() => {
  return {
    "rounded-lg px-4 py-2 font-medium": true,
    "bg-primary text-white": props.variant === VARIANT_PRIMARY,
    "bg-secondary text-primary": props.variant === VARIANT_SECONDARY,
  };
});
</script>
