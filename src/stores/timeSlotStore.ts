import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { TimeSlot } from "../types";
import type { ConnectionStatus, SSEUpdate } from "../types";
import {
  STATUS_CONNECTED,
  STATUS_CONNECTING,
  STATUS_DISCONNECTED,
  STATUS_ERROR,
} from "../constants/connectionStatus.ts";

function getDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export const useTimeSlotStore = defineStore("timeSlot", () => {
  const timeSlots = ref<TimeSlot[]>([]);
  const selectedSlot = ref<TimeSlot | null>(null);
  const connectionStatus = ref<ConnectionStatus>(STATUS_DISCONNECTED);

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/timeSlots");
      timeSlots.value = await response.json();
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const groupedTimeSlots = computed(() => {
    const groups: Record<string, TimeSlot[]> = {};

    timeSlots.value.forEach((slot) => {
      const day = getDay(slot.start_time);
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(slot);
    });

    return groups;
  });

  const selectSlot = (slot: TimeSlot | null) => {
    selectedSlot.value = slot;
  };

  const startSSE = () => {
    const eventSource = new EventSource(import.meta.env.VITE_API_URL + "/sse");

    connectionStatus.value = STATUS_CONNECTING;

    eventSource.onopen = () => {
      connectionStatus.value = STATUS_CONNECTED;
    };

    eventSource.onmessage = (event) => {
      try {
        const update: SSEUpdate = JSON.parse(event.data);

        const slotToUpdate = timeSlots.value.find(
          (slot) => slot.id === update.id,
        );
        if (slotToUpdate) {
          slotToUpdate.capacity.current_capacity = update.currentCapacity;
          slotToUpdate.category = update.category;
        }
      } catch (error) {
        console.error("Error processing SSE update:", error);
        connectionStatus.value = STATUS_ERROR;
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection failed. Retrying...");
      connectionStatus.value = STATUS_DISCONNECTED;
      eventSource.close();
      setTimeout(startSSE, 5000);
    };
  };

  return {
    timeSlots,
    groupedTimeSlots,
    selectedSlot,
    connectionStatus,
    fetchTimeSlots,
    selectSlot,
    startSSE,
  };
});
