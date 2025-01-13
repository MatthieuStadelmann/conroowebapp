<script setup lang="ts">
import { onMounted } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate, formatDay, formatTime } from "../utils/formatters";
import {
  CATEGORY_GREEN,
  CATEGORY_YELLOW,
  CATEGORY_RED,
} from "../constants/categories.ts";

const store = useTimeSlotStore();

onMounted(() => {
  store.fetchTimeSlots();
});
</script>

<template>
  <div class="mb-60 mt-10 grid grid-cols-1 gap-4 lg:mb-40 lg:grid-cols-5">
    <div v-for="(slots, day) in store.groupedTimeSlots" :key="day">
      <h3 class="text-2xl font-bold">{{ formatDay(day) }}</h3>
      <span class="text-sm text-gray-500">{{ formatDate(day) }}</span>
      <ul class="mt-4">
        <li
          v-for="slot in slots"
          class="mb-4 cursor-pointer rounded-lg p-2 text-white shadow-md transition-shadow duration-150 last:mb-0"
          :key="slot.id"
          :class="{
            'bg-greenCategory': slot.category === CATEGORY_GREEN,
            'bg-yellowCategory': slot.category === CATEGORY_YELLOW,
            'bg-redCategory': slot.category === CATEGORY_RED,
            'ring-4 ring-secondary': slot === store.selectedSlot,
          }"
          @click="store.selectSlot(slot)"
        >
          <time
            class="text-lg font-medium uppercase"
            :datetime="slot.start_time"
          >
            {{ formatTime(slot.start_time) }}
          </time>
          <br />
          <span class="text-lg font-medium">
            {{ slot.capacity.current_capacity }}/{{
              slot.capacity.max_capacity
            }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
