import { defineStore } from "pinia";
import { ref, computed, type ComputedRef, type Ref } from "vue";
import type { TimeSlot, ConnectionStatus } from "../types";
import { useSSE } from "../composables/useSSE";

function getDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

interface TimeSlotStoreState {
  timeSlots: Ref<TimeSlot[]>;
  groupedTimeSlots: ComputedRef<Record<string, TimeSlot[]>>;
  selectedSlot: Ref<TimeSlot | null>;
  connectionStatus: Ref<ConnectionStatus>;
  fetchTimeSlots: () => Promise<void>;
  selectSlot: (slot: TimeSlot | null) => void;
  startSSE: () => void;
  closeSSE: () => void;
}

export const useTimeSlotStore = defineStore("timeSlot", (): TimeSlotStoreState => {
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

  const fetchTimeSlots = async (): Promise<void> => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/timeSlots");
      timeSlots.value = await response.json();
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const groupedTimeSlots = computed((): Record<string, TimeSlot[]> => {
    const groups: Record<string, TimeSlot[]> = {};
    timeSlots.value.forEach((slot) => {
      const day = getDay(slot.start_time);
      if (!groups[day]) groups[day] = [];
      groups[day].push(slot);
    });
    return groups;
  });

  const selectSlot = (slot: TimeSlot | null): void => {
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
