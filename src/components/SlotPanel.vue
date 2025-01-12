<script setup lang="ts">
import { computed } from "vue";
import { useTimeSlotStore } from "@/stores/timeSlotStore";
import { formatDate, formatTime } from "@/utils/formatters";

const store = useTimeSlotStore();

const isPanelVisible = computed(() => !!store.selectedSlot);
const selectedSlot = computed(() => store.selectedSlot);
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 transform border-t border-gray-200 bg-white bg-gradient-to-r from-white to-gray-50 px-10 py-4 shadow-lg transition-transform duration-300"
    :class="{
      'translate-y-full': !isPanelVisible,
      'translate-y-0': isPanelVisible,
    }"
  >
    <div v-if="selectedSlot">
      <h2 class="text-xl font-bold">
        {{ formatDate(selectedSlot.start_time, true) }}
      </h2>
      <div class="relative mt-2 h-3 w-full max-w-60 rounded-full bg-gray-200">
        <div
          class="absolute left-0 top-0 h-full rounded-full"
          :class="{
            'bg-greenCategory': selectedSlot.category === 'green',
            'bg-yellowCategory': selectedSlot.category === 'yellow',
            'bg-redCategory': selectedSlot.category === 'red',
          }"
          :style="{
            width:
              ((selectedSlot.capacity.max_capacity -
                selectedSlot.capacity.current_capacity) /
                selectedSlot.capacity.max_capacity) *
                100 +
              '%',
          }"
        ></div>
      </div>
      <div class="mt-4 flex flex-col lg:flex-row lg:items-center">
        <p class="min-w-[200px] flex-shrink-0">
          <strong>Time:</strong>
          <span class="uppercase">
            {{ formatTime(selectedSlot.start_time) }} -
            {{ formatTime(selectedSlot.end_time) }}</span
          >
        </p>
        <p class="min-w-[150px] flex-shrink-0 lg:ml-6">
          <strong>Capacity:</strong>
          {{ selectedSlot.capacity.current_capacity }}/{{
            selectedSlot.capacity.max_capacity
          }}
        </p>
        <button
          class="mt-4 rounded-lg bg-secondary px-4 py-2 font-medium text-primary lg:mt-0"
        >
          Reserve Slot
        </button>
      </div>
    </div>
  </div>
</template>
