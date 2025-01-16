<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate, formatDay } from "../utils/dateFormatters";
import TimeSlot from "./UI/TimeSlot.vue";
import BaseLoader from "./UI/BaseLoader.vue";

const store = useTimeSlotStore();
const calendarRef = ref<HTMLElement | null>(null);

const marginClass = computed(() => 
  store.selectedSlot ? 'mb-60 lg:mb-40' : 'mb-10'
);

const handleOutsideClick = (event: MouseEvent) => {
  if (calendarRef.value && !calendarRef.value.contains(event.target as Node)) {
    store.selectSlot(null);
  }
};

onMounted(() => {
  store.fetchTimeSlots();
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<template>
  <div class="min-h-[calc(100vh-12rem)]">
    <div 
      v-if="store.isLoading"
      class="flex min-h-[32rem] items-center justify-center"
    >
      <BaseLoader />
    </div>
    
    <div 
      v-else-if="store.error"
      class="mt-10 text-red-500"
    >
      {{ store.error }}
    </div>

    <div 
      v-else
      ref="calendarRef"
      :class="['mt-10 grid grid-cols-1 gap-4 transition-[margin] duration-300 ease-in-out lg:grid-cols-5', marginClass]"
    >
      <div
        v-for="(slots, day) in store.groupedTimeSlots"
        :key="day"
      >
        <h3 class="text-2xl font-bold">
          {{ formatDay(day) }}
        </h3>
        <span class="text-sm text-gray-500">{{ formatDate(day) }}</span>
        <ul class="mt-4">
          <TimeSlot
            v-for="(slot, index) in slots"
            :key="index"
            :time-slot="slot"
            :is-selected="slot === store.selectedSlot"
            @select="store.selectSlot"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
