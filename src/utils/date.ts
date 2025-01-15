/**
 * Extracts the date portion (YYYY-MM-DD) from a date string.
 * Converts a date string into its ISO date representation without the time component.
 * 
 * This utility helps standardize date formatting across the application,
 * particularly when grouping time slots by day.
 * 
 * @param dateString - The input date string to process
 * @returns The date portion in YYYY-MM-DD format
 * @example
 * getDay("2024-03-14T15:30:00Z") // returns "2024-03-14"
 */
export function getDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
} 