<script setup lang="ts">
import { onMounted } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate, formatDay, formatTime } from "../utils/formatters";

const CATEGORY_GREEN = "green";
const CATEGORY_YELLOW = "yellow";
const CATEGORY_RED = "red";

const store = useTimeSlotStore();

onMounted(() => {
  store.fetchTimeSlots();
});
</script>

<template>
  <div class="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-5">
    <div v-for="(slots, day) in store.groupedTimeSlots" :key="day">
      <h3 class="text-2xl font-bold">{{ formatDay(day) }}</h3>
      <span>{{ formatDate(day) }}</span>
      <ul>
        <li
          v-for="slot in slots"
          class="mb-4 rounded-lg p-2 text-white last:mb-0"
          :key="slot.id"
          :class="{
            'bg-greenCategory': slot.category === CATEGORY_GREEN,
            'bg-yellowCategory': slot.category === CATEGORY_YELLOW,
            'bg-redCategory': slot.category === CATEGORY_RED,
          }"
        >
          <time class="text-xl uppercase" :datetime="slot.start_time">
            {{ formatTime(slot.start_time) }}
          </time>
          <br />
          <span>
            {{ slot.capacity.current_capacity }}/{{
              slot.capacity.max_capacity
            }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
