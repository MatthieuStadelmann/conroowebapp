<script setup lang="ts">
import { defineProps, computed } from "vue";
import { formatTime } from "../../utils/formatters.ts";
import TimeSlot from "./TimeSlot.vue";
import { getCategoryClass } from "../../utils/getCategoryClass.ts";

const props = defineProps<{
  timeSlot: TimeSlot;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  (event: "select", timeSlot: TimeSlot): void;
}>();

function handleClick() {
  emit("select", props.timeSlot);
}

const categoryClass = computed(() => getCategoryClass(props.timeSlot.category));
</script>
<template>
  <li
    class="mb-4 cursor-pointer list-none rounded-lg border p-2 text-white transition focus:outline-none focus:ring-4 focus:ring-secondary"
    :class="[categoryClass, isSelected ? 'ring-4 ring-secondary' : '']"
    @click="handleClick"
  >
    <time
      class="text-lg font-medium uppercase"
      :datetime="timeSlot.start_time"
    >
      {{ formatTime(timeSlot.start_time) }}
    </time>
    <br>
    <span class="text-sm font-medium">
      Capacity:
      {{ timeSlot.capacity.current_capacity }}/{{
        timeSlot.capacity.max_capacity
      }}
    </span>
  </li>
</template>
