<script setup lang="ts">
import { computed } from "vue";
import { useTimeSlotStore } from "../../stores/timeSlotStore";
import { STATUS_CLASSES, STATUS_ANIMATION_CLASSES, STATUS_MESSAGES } from "../../constants/statusDisplay";

const store = useTimeSlotStore();

const connectionStatusClass = computed(() => 
  STATUS_CLASSES[store.connectionStatus] || "bg-gray-400"
);

const connectionStatusMessage = computed(() => 
  STATUS_MESSAGES[store.connectionStatus] || "Unknown status"
);

const animationClass = computed(() => 
  STATUS_ANIMATION_CLASSES[store.connectionStatus] || ""
);
</script>

<template>
  <div class="flex items-center space-x-2">
    <span class="relative flex h-3 w-3">
      <span
        class="absolute inline-flex h-full w-full rounded-full opacity-75"
        :class="animationClass"
      />
      <span
        class="relative inline-flex h-3 w-3 rounded-full"
        :class="connectionStatusClass"
      />
    </span>
    <span>{{ connectionStatusMessage }}</span>
  </div>
</template>