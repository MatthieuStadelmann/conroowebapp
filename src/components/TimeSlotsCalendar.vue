<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate, formatDay } from "../utils/dateFormatters";
import TimeSlot from "./UI/TimeSlot.vue";

const store = useTimeSlotStore();
const calendarRef = ref<HTMLElement | null>(null);

const marginClass = computed(() => 
  store.selectedSlot ? 'mb-60 lg:mb-40' : 'mb-10'
);

onMounted(() => {
  store.fetchTimeSlots();
  document.addEventListener('click', (event) => {
    if (calendarRef.value && !calendarRef.value.contains(event.target as Node)) {
      store.selectSlot(null);
    }
  });
});
</script>

<template>
  <div 
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
</template>
