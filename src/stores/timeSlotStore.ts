import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { TimeSlot } from "../types";
import { useSSE } from "../composables/useSSE";

function getDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export const useTimeSlotStore = defineStore("timeSlot", () => {
  const timeSlots = ref<TimeSlot[]>([]);
  const selectedSlot = ref<TimeSlot | null>(null);

  const { connectionStatus, startSSE, closeSSE } = useSSE((update) => {
    const slotToUpdate = timeSlots.value.find(
      (slot) => slot.id === update.id,
    );
    if (slotToUpdate) {
      slotToUpdate.capacity.current_capacity = update.currentCapacity;
      slotToUpdate.category = update.category;
    }
  });

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
      if (!groups[day]) groups[day] = [];
      groups[day].push(slot);
    });
    return groups;
  });

  const selectSlot = (slot: TimeSlot | null) => {
    selectedSlot.value = slot;
  };

  return {
    timeSlots,
    groupedTimeSlots,
    selectedSlot,
    connectionStatus,
    fetchTimeSlots,
    selectSlot,
    startSSE,
    closeSSE,
  };
});
