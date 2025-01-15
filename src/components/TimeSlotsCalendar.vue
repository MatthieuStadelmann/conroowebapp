<script setup lang="ts">
import { onMounted } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate, formatDay } from "../utils/formatters";
import TimeSlot from "./UI/TimeSlot.vue";

const store = useTimeSlotStore();

onMounted(() => {
  store.fetchTimeSlots();
});
</script>

<template>
  <div class="mb-60 mt-10 grid grid-cols-1 gap-4 lg:mb-40 lg:grid-cols-5">
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
