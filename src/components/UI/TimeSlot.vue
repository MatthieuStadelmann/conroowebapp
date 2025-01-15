<script setup lang="ts">
import { computed } from "vue";
import { formatTime } from "../../utils/formatters.ts";
import { getCategoryClass } from "../../utils/getCategoryClass.ts";
import type { TimeSlot } from "../../types/TimeSlot";

const props = defineProps<{
  timeSlot: TimeSlot;
  isSelected?: boolean;
}>();

defineEmits<{
  (event: "select", timeSlot: TimeSlot): void;
}>();

const categoryClass = computed(() => getCategoryClass(props.timeSlot.category));
</script>

<template>
  <button
    type="button"
    class="mb-4 block w-full rounded-lg border p-2 text-left text-white transition focus:outline-none focus:ring-4 focus:ring-secondary"
    :class="[categoryClass, isSelected ? 'ring-4 ring-secondary' : '']"
    :aria-selected="isSelected"
    :aria-label="`Time slot at ${formatTime(timeSlot.start_time)}`"
    @click="$emit('select', timeSlot)"
  >
    <time
      class="block text-lg font-medium uppercase"
      :datetime="timeSlot.start_time"
    >
      {{ formatTime(timeSlot.start_time) }}
    </time>
    <span 
      class="text-sm font-medium"
      :aria-label="`${timeSlot.capacity.current_capacity} out of ${timeSlot.capacity.max_capacity} spots available`"
    >
      Capacity:
      {{ timeSlot.capacity.current_capacity }}/{{ timeSlot.capacity.max_capacity }}
    </span>
  </button>
</template>
