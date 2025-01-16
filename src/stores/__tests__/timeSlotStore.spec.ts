import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTimeSlotStore } from '../timeSlotStore';
import { CATEGORY_GREEN } from '../../constants/categories';
import type { TimeSlot } from '../../types';

describe('TimeSlotStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should fetch and normalize time slots', async () => {
    const store = useTimeSlotStore();
    const mockRawTimeSlot = {
      id: 1,
      startTime: '2024-03-20T10:00:00Z',
      endTime: '2024-03-20T11:00:00Z',
      category: CATEGORY_GREEN,
      capacity: {
        current: 5,
        maximum: 10
      }
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockRawTimeSlot])
    }));

    await store.fetchTimeSlots();

    expect(store.timeSlots).toHaveLength(1);
    expect(store.timeSlots[0]).toEqual({
      id: 1,
      start_time: '2024-03-20T10:00:00Z',
      end_time: '2024-03-20T11:00:00Z',
      category: CATEGORY_GREEN,
      capacity: {
        current_capacity: 5,
        max_capacity: 10
      }
    });
  });

  it('should handle fetch errors', async () => {
    const store = useTimeSlotStore();
    const errorMessage = 'Failed to fetch time slots';

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false
    }));

    await store.fetchTimeSlots();

    expect(store.error).toBe(errorMessage);
    expect(store.timeSlots).toHaveLength(0);
  });

  it('should group time slots by day', () => {
    const store = useTimeSlotStore();
    const slots: TimeSlot[] = [
      {
        id: 1,
        start_time: '2024-03-20T10:00:00Z',
        end_time: '2024-03-20T11:00:00Z',
        category: CATEGORY_GREEN,
        capacity: { current_capacity: 5, max_capacity: 10 }
      },
      {
        id: 2,
        start_time: '2024-03-20T14:00:00Z',
        end_time: '2024-03-20T15:00:00Z',
        category: CATEGORY_GREEN,
        capacity: { current_capacity: 3, max_capacity: 10 }
      },
      {
        id: 3,
        start_time: '2024-03-21T10:00:00Z',
        end_time: '2024-03-21T11:00:00Z',
        category: CATEGORY_GREEN,
        capacity: { current_capacity: 7, max_capacity: 10 }
      }
    ];

    store.timeSlots = slots;

    const grouped = store.groupedTimeSlots;
    expect(Object.keys(grouped)).toHaveLength(2);
    expect(grouped['2024-03-20']).toHaveLength(2);
    expect(grouped['2024-03-21']).toHaveLength(1);
  });
}); 