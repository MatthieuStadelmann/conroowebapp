<script setup lang="ts">
import { onMounted } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import { formatDate, formatDay, formatTime } from "../utils/formatters";

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
            'bg-greenCategory': slot.category === 'green',
            'bg-yellowCategory': slot.category === 'yellow',
            'bg-redCategory': slot.category === 'red',
          }"
        >
          <time class="text-xl" :datetime="slot.start_time">
            {{ formatTime(slot.start_time) }} AM
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
