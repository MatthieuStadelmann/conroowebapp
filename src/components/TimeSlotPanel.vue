<script setup lang="ts">
import { computed } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate } from "../utils/formatters";
import CapacityBar from "./UI/CapacityBar.vue";
import TimeSlotDetails from "./UI/TimeSlotDetails.vue";

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
        {{ formatDate(selectedSlot.start_time, true) }}
      </h2>
      
      <CapacityBar
        :category="selectedSlot.category"
        :current-capacity="selectedSlot.capacity.current_capacity"
        :max-capacity="selectedSlot.capacity.max_capacity"
      />

      <TimeSlotDetails :time-slot="selectedSlot" />
    </div>
  </div>
</template>
