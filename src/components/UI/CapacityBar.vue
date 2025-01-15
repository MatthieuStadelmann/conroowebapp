<script setup lang="ts">
import { CATEGORY_GREEN, CATEGORY_YELLOW, CATEGORY_RED } from "../../constants/categories";

defineProps<{
  category: string;
  currentCapacity: number;
  maxCapacity: number;
}>();

const getColorClass = (category: string) => ({
  'bg-greenCategory': category === CATEGORY_GREEN,
  'bg-yellowCategory': category === CATEGORY_YELLOW,
  'bg-redCategory': category === CATEGORY_RED,
});
</script>

<template>
  <div class="relative mt-2 h-3 w-full max-w-60 rounded-full bg-gray-200">
    <div
      class="absolute left-0 top-0 h-full rounded-full"
      :class="getColorClass(category)"
      :style="{
        width: ((maxCapacity - currentCapacity) / maxCapacity) * 100 + '%',
      }"
    />
  </div>
</template> 