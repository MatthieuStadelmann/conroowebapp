<script setup lang="ts">
import { formatTime } from "../../utils/dateFormatters";
import BaseButton from "./BaseButton.vue";
import type { TimeSlot } from "../../types";

defineProps<{
  timeSlot: TimeSlot;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const handleReserve = () => {
  alert("🚛 Oops! This button is as functional as a chocolate teapot! \n\n" +
        "The developer was too busy writing TypeScript interfaces to implement actual reservations. 😅");
};
</script>

<template>
  <div class="mt-4 flex flex-col lg:flex-row lg:items-center">
    <p class="min-w-[200px] flex-shrink-0">
      <strong>Time: </strong>
      <span class="uppercase">
        {{ formatTime(timeSlot.start_time) }} -
        {{ formatTime(timeSlot.end_time) }}
      </span>
    </p>
    <p class="min-w-[150px] flex-shrink-0 lg:ml-6">
      <strong>Capacity: </strong>
      {{ timeSlot.capacity.current_capacity }}/{{ timeSlot.capacity.max_capacity }}
    </p>
    <BaseButton
      class="mt-4 lg:mt-0"
      variant="secondary"
      @click="handleReserve"
    >
      Reserve Slot
    </BaseButton>
  </div>
</template> 