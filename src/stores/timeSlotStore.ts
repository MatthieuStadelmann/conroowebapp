import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { SSEUpdate, TimeSlot } from "../types";
import { useSSE } from "../composables/useSSE";
import type { TimeSlotStoreState } from "../types/store";
import { getDay } from "../utils/dateFormatters";
import { normalizeTimeSlot } from "../utils/normalizeTimeSlot";

export const useTimeSlotStore = defineStore("timeSlot", (): TimeSlotStoreState => {
  const timeSlots = ref<TimeSlot[]>([]);
  const selectedSlot = ref<TimeSlot | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const pendingUpdate = ref<SSEUpdate | null>(null);

  watch(pendingUpdate, (update) => {
    if (!update) return;
    
    const slotToUpdate = timeSlots.value.find(
      (slot) => slot.id === update.id,
    );
    if (slotToUpdate) {
      slotToUpdate.capacity.current_capacity = update.currentCapacity;
      slotToUpdate.category = update.category;
    }
    pendingUpdate.value = null;
  }, { flush: 'sync' });

  const { connectionStatus, startSSE, closeSSE } = useSSE((update) => {
    pendingUpdate.value = update;
  });

  const fetchTimeSlots = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/timeSlots");
      if (!response.ok) throw new Error('Failed to fetch time slots');
      const rawTimeSlots = await response.json();
      timeSlots.value = rawTimeSlots.map(normalizeTimeSlot);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  const groupedTimeSlots = computed((): Record<string, TimeSlot[]> => {
    const currentTimeSlots = timeSlots.value;
    
    const groupMap = new Map<string, TimeSlot[]>();
    
    currentTimeSlots.forEach((slot) => {
      const day = getDay(slot.start_time);
      if (!groupMap.has(day)) {
        groupMap.set(day, []);
      }
      groupMap.get(day)!.push(slot);
    });
    
    return Object.fromEntries(groupMap);
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
