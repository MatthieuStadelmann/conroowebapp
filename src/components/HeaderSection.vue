<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTimeSlotStore } from "../stores/timeSlotStore";
import {
  STATUS_CONNECTED,
  STATUS_CONNECTING,
  STATUS_DISCONNECTED,
  STATUS_ERROR,
} from "../constants/connectionStatus.ts";

const store = useTimeSlotStore();

const connectionStatusClass = computed(() => {
  const STATUS_CLASSES: Record<string, string> = {
    [STATUS_CONNECTING]: "bg-blue-400",
    [STATUS_CONNECTED]: "bg-green-500",
    [STATUS_DISCONNECTED]: "bg-red-500",
    [STATUS_ERROR]: "bg-yellow-500",
  };

  return STATUS_CLASSES[store.connectionStatus] || "bg-gray-400";
});

const connectionStatusMessage = computed(() => {
  const STATUS_MESSAGES: Record<string, string> = {
    [STATUS_CONNECTING]: "Connecting",
    [STATUS_CONNECTED]: "Live updates",
    [STATUS_DISCONNECTED]: "Disconnected",
    [STATUS_ERROR]: "Error processing updates",
  };

  return STATUS_MESSAGES[store.connectionStatus] || "Unknown status";
});

onMounted(() => {
  store.startSSE();
});
</script>

<template>
  <div class="flex justify-between border-b-2 border-primary py-10">
    <h1 class="text-4xl font-bold">
      Trucking Web App
    </h1>
    <div class="flex items-center space-x-2">
      <span class="relative flex h-3 w-3">
        <span
          class="absolute inline-flex h-full w-full rounded-full opacity-75"
          :class="{
            'animate-ping bg-blue-400':
              store.connectionStatus === STATUS_CONNECTING,
            'animate-ping bg-green-400':
              store.connectionStatus === STATUS_CONNECTED,
          }"
        />
        <span
          class="relative inline-flex h-3 w-3 rounded-full"
          :class="connectionStatusClass"
        />
      </span>
      <span>{{ connectionStatusMessage }}</span>
    </div>
  </div>
</template>
