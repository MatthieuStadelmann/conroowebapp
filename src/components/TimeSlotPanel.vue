<script setup lang="ts">
import { computed } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate } from "../utils/dateFormatters";
import CapacityBar from "./UI/CapacityBar.vue";
import TimeSlotDetails from "./UI/TimeSlotDetails.vue";

const store = useTimeSlotStore();

const isPanelVisible = computed(() => !!store.selectedSlot);
const selectedSlot = computed(() => store.selectedSlot);
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="isPanelVisible"
      class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white bg-gradient-to-r from-white to-gray-50 px-6 py-4 shadow-lg lg:px-12"
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
  </Transition>
</template>
