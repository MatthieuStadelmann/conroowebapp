<script setup lang="ts">
import { computed } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate, formatTime } from "../utils/formatters";
import BaseButton from "./UI/BaseButton.vue";
import {
  CATEGORY_GREEN,
  CATEGORY_RED,
  CATEGORY_YELLOW,
} from "../constants/categories.ts";

const store = useTimeSlotStore();

const isPanelVisible = computed(() => !!store.selectedSlot);
const selectedSlot = computed(() => store.selectedSlot);
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 transform border-t border-gray-200 bg-white bg-gradient-to-r from-white to-gray-50 px-6 py-4 shadow-lg transition-transform duration-300 lg:px-12"
    :class="{
      'translate-y-full': !isPanelVisible,
      'translate-y-0': isPanelVisible,
    }"
  >
    <div v-if="selectedSlot">
      <h2 class="text-xl font-bold">
        {{ formatDate(selectedSlot.start_time, true, true) }}
      </h2>
      <div class="relative mt-2 h-3 w-full max-w-60 rounded-full bg-gray-200">
        <div
          class="absolute left-0 top-0 h-full rounded-full"
          :class="{
            'bg-greenCategory': selectedSlot.category === CATEGORY_GREEN,
            'bg-yellowCategory': selectedSlot.category === CATEGORY_YELLOW,
            'bg-redCategory': selectedSlot.category === CATEGORY_RED,
          }"
          :style="{
            width:
              ((selectedSlot.capacity.max_capacity -
                selectedSlot.capacity.current_capacity) /
                selectedSlot.capacity.max_capacity) *
              100 +
              '%',
          }"
        />
      </div>
      <div class="mt-4 flex flex-col lg:flex-row lg:items-center">
        <p class="min-w-[200px] flex-shrink-0">
          <strong>Time:</strong>
          <span class="uppercase">
            {{ formatTime(selectedSlot.start_time) }} -
            {{ formatTime(selectedSlot.end_time) }}</span>
        </p>
        <p class="min-w-[150px] flex-shrink-0 lg:ml-6">
          <strong>Capacity:</strong>
          {{ selectedSlot.capacity.current_capacity }}/{{
            selectedSlot.capacity.max_capacity
          }}
        </p>
        <BaseButton
          class="mt-4 lg:mt-0"
          variant="secondary"
        >
          Reserve Slot
        </BaseButton>
      </div>
    </div>
  </div>
</template>
