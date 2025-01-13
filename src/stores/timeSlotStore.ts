import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { TimeSlot } from "../types/TimeSlot";

function getDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export const useTimeSlotStore = defineStore("timeSlot", () => {
  const timeSlots = ref<TimeSlot[]>([]);
  const selectedSlot = ref<TimeSlot | null>(null);

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/timeSlots");
      const data = await response.json();
      timeSlots.value = data;
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

  const selectSlot = (slot: TimeSlot) => {
    selectedSlot.value = slot;
  };

  return {
    timeSlots,
    groupedTimeSlots,
    selectedSlot,
    fetchTimeSlots,
    selectSlot,
  };
});
