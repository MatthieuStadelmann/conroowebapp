<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted, defineAsyncComponent } from "vue";
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

const TimeSlotPanel = defineAsyncComponent({
  loader: () => import('./TimeSlotPanel.vue'),
  loadingComponent: undefined,
  delay: 0,
  timeout: 3000
});

onMounted(() => {
  store.fetchTimeSlots();
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<template>
  <div class="flex-grow">
    <div 
      v-if="store.isLoading"
      class="grid h-[50vh] place-content-center"
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

    <TimeSlotPanel />
  </div>
</template>
