<script setup lang="ts">
import { formatTime } from "../../utils/formatters";
import BaseButton from "./BaseButton.vue";
import type { TimeSlot } from "../../types";

defineProps<{
  timeSlot: TimeSlot;
}>();
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
    >
      Reserve Slot
    </BaseButton>
  </div>
</template> 