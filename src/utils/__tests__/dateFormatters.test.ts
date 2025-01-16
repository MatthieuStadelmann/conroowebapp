import { describe, it, expect } from 'vitest'
import { formatDay, formatDate, formatTime, getDay } from '../dateFormatters'

describe('dateFormatters', () => {
  describe('formatDay', () => {
    it('should format weekday correctly', () => {
      const tests = [
        { input: '2024-03-14T15:30:00', expected: 'Thursday' },
        { input: '2024-03-15T15:30:00', expected: 'Friday' },
        { input: '2024-03-16T15:30:00', expected: 'Saturday' },
        { input: '2024-03-17T15:30:00', expected: 'Sunday' }
      ]
      
      tests.forEach(({ input, expected }) => {
        expect(formatDay(input)).toBe(expected)
      })
    })
  })

  describe('formatDate', () => {
    it('should format date without weekday', () => {
      const input = '2024-03-14T15:30:00'
      const expected = '14 Mar'
      
      expect(formatDate(input)).toBe(expected)
    })

    it('should format date with weekday when includeDay is true', () => {
      const input = '2024-03-14T15:30:00'  // This is a Thursday
      const expected = 'Thursday 14 Mar'
      
      expect(formatDate(input, true)).toBe(expected)
    })

    it('should handle different months', () => {
      const tests = [
        { input: '2024-01-01T00:00:00', expected: '01 Jan' },
        { input: '2024-06-15T00:00:00', expected: '15 Jun' },
        { input: '2024-12-31T00:00:00', expected: '31 Dec' }
      ]

      tests.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected)
      })
    })
  })

  describe('formatTime', () => {
    it('should format time in 12-hour format', () => {
      const tests = [
        { input: '2024-03-14T15:30:00', expected: '03:30 pm' },
        { input: '2024-03-14T09:30:00', expected: '09:30 am' },
        { input: '2024-03-14T00:00:00', expected: '12:00 am' },
        { input: '2024-03-14T12:00:00', expected: '12:00 pm' }
      ]
      
      tests.forEach(({ input, expected }) => {
        expect(formatTime(input)).toBe(expected)
      })
    })
  })

  describe('getDay', () => {
    it('should extract date portion from ISO string', () => {
      const tests = [
        { input: '2024-03-14T12:00:00Z', expected: '2024-03-14' },
        { input: '2024-03-15T12:00:00Z', expected: '2024-03-15' },
        { input: '2024-03-16T12:00:00Z', expected: '2024-03-16' }
      ]
      
      tests.forEach(({ input, expected }) => {
        expect(getDay(input)).toBe(expected)
      })
    })

    it('should handle different time zones', () => {
      const input = '2024-03-14T12:00:00+01:00'
      const expected = '2024-03-14'
      
      expect(getDay(input)).toBe(expected)
    })
  })
}) 