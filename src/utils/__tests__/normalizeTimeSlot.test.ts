import { describe, it, expect } from 'vitest'
import { normalizeTimeSlot } from '../normalizeTimeSlot'
import type { RawTimeSlot, TimeSlot } from '../../types'

describe('normalizeTimeSlot', () => {
  it('should normalize snake_case data', () => {
    const input: RawTimeSlot = {
      id: 1,
      start_time: "2024-07-23T08:00:00",
      end_time: "2024-07-23T08:30:00",
      category: "yellow",
      capacity: {
        current_capacity: 20,
        max_capacity: 50
      }
    }

    const result = normalizeTimeSlot(input)
    
    expect(result).toEqual<TimeSlot>({
      id: 1,
      start_time: "2024-07-23T08:00:00",
      end_time: "2024-07-23T08:30:00",
      category: "yellow",
      capacity: {
        current_capacity: 20,
        max_capacity: 50
      }
    })
  })

  it('should normalize camelCase data', () => {
    const input: RawTimeSlot = {
      id: 2,
      startTime: "2024-07-23T08:30:00",
      endTime: "2024-07-23T09:00:00",
      category: "red",
      capacity: {
        current: 40,
        maximum: 50
      }
    }

    const result = normalizeTimeSlot(input)
    
    expect(result).toEqual<TimeSlot>({
      id: 2,
      start_time: "2024-07-23T08:30:00",
      end_time: "2024-07-23T09:00:00",
      category: "red",
      capacity: {
        current_capacity: 40,
        max_capacity: 50
      }
    })
  })
}) 