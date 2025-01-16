<script setup lang="ts">
import { CATEGORY_GREEN, CATEGORY_YELLOW, CATEGORY_RED, STYLE_GREEN, STYLE_YELLOW, STYLE_RED } from "../../constants/categories";

defineProps<{
  category: string;
  currentCapacity: number;
  maxCapacity: number;
}>();

const getColorClass = (category: string) => ({
  [STYLE_GREEN]: category === CATEGORY_GREEN,
  [STYLE_YELLOW]: category === CATEGORY_YELLOW,
  [STYLE_RED]: category === CATEGORY_RED,
});
</script>

<template>
  <div class="relative mt-2 h-3 w-full max-w-60 rounded-full bg-gray-200">
    <div
      class="absolute left-0 top-0 h-full rounded-full transition-all duration-300 ease-in-out"
      :class="getColorClass(category)"
      :style="{
        width: ((maxCapacity - currentCapacity) / maxCapacity) * 100 + '%',
      }"
    />
  </div>
</template> 