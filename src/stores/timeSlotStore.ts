import { defineStore } from "pinia";
import { ref, computed, onUnmounted } from "vue";
import type { TimeSlot } from "../types";
import { useSSE } from "../composables/useSSE";
import type { TimeSlotStoreState } from "../types/store";
import { getDay } from "../utils/dateFormatters";
import { normalizeTimeSlot } from "../utils/normalizeTimeSlot";

export const useTimeSlotStore = defineStore("timeSlot", (): TimeSlotStoreState => {
  const timeSlots = ref<TimeSlot[]>([]);
  const selectedSlot = ref<TimeSlot | null>(null);
  const isLoading = ref<boolean>(false);
  let loadingTimeout: number | null = null;
  const error = ref<string | null>(null);

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
    isLoading.value = true;
    error.value = null;
    
    const loadingStart = Date.now();
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/timeSlots");
      if (!response.ok) throw new Error('Failed to fetch time slots');
      const rawTimeSlots = await response.json();
      timeSlots.value = rawTimeSlots.map(normalizeTimeSlot);
      
      const loadingTime = Date.now() - loadingStart;
      const remainingTime = Math.max(300 - loadingTime, 0);
      
      loadingTimeout = window.setTimeout(() => {
        isLoading.value = false;
      }, remainingTime);
      
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred';
      isLoading.value = false;
    }
  };

  onUnmounted(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
  });

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
    isLoading,
    error,
    connectionStatus,
    fetchTimeSlots,
    selectSlot,
    startSSE,
    closeSSE,
  };
});
