import type { Ref, ComputedRef } from 'vue';
import type { TimeSlot, ConnectionStatus } from './index';

export interface TimeSlotStoreState {
  timeSlots: Ref<TimeSlot[]>;
  groupedTimeSlots: ComputedRef<Record<string, TimeSlot[]>>;
  selectedSlot: Ref<TimeSlot | null>;
  connectionStatus: Ref<ConnectionStatus>;
  fetchTimeSlots: () => Promise<void>;
  selectSlot: (slot: TimeSlot | null) => void;
  startSSE: () => void;
  closeSSE: () => void;
} 