import type { RawTimeSlot, TimeSlot } from '../types'

/**
 * Normalizes a time slot object from the API response to ensure consistent property names.
 * Handles both snake_case and camelCase variations of the data.
 * 
 * @param rawTimeSlot - The raw time slot data from the API
 * @returns A normalized TimeSlot object with consistent property names
 */
export function normalizeTimeSlot(rawTimeSlot: RawTimeSlot): TimeSlot {
  return {
    id: rawTimeSlot.id,
    start_time: (rawTimeSlot.start_time || rawTimeSlot.startTime) ?? '',
    end_time: (rawTimeSlot.end_time || rawTimeSlot.endTime) ?? '',
    category: rawTimeSlot.category,
    capacity: {
      current_capacity: rawTimeSlot.capacity.current_capacity || rawTimeSlot.capacity.current || 0,
      max_capacity: rawTimeSlot.capacity.max_capacity || rawTimeSlot.capacity.maximum || 0
    }
  }
}