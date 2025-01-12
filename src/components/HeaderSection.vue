<script setup lang="ts">
import { onMounted } from "vue";
import { useTimeSlotStore } from "@/stores/timeSlotStore";

const store = useTimeSlotStore();

onMounted(() => {
  store.startSSE();
});
</script>

<template>
  <div class="flex justify-between border-b-2 border-primary py-10">
    <h1 class="text-4xl font-bold">Trucking Web App</h1>
    <div class="flex items-center space-x-2">
      <span class="relative flex h-3 w-3">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
          v-if="store.connectionStatus === 'connected'"
        ></span>
        <span
          class="relative inline-flex h-3 w-3 rounded-full"
          :class="{
            'bg-green-500': store.connectionStatus === 'connected',
            'bg-red-500': store.connectionStatus === 'disconnected',
          }"
        ></span>
      </span>
      <span>{{
        store.connectionStatus === "connected" ? "Live updates" : "Disconnected"
      }}</span>
    </div>
  </div>
</template>
