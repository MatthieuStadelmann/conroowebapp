/**
 * Formats a date string to display the full weekday name (e.g., "Monday").
 * @param dateString - The ISO date string to format.
 * @returns The formatted weekday name in English (e.g., "Monday").
 */
export function formatDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
  });
}

/**
 * Formats a date string into a readable format with optional inclusion of the weekday.
 * - When `includeDay` is `true`, the output includes the weekday (e.g., "Monday, 13 Jan").
 * - When `includeDay` is `false`, the output excludes the weekday (e.g., "13 Jan").
 *
 * @param dateString - The ISO date string to format.
 * @param includeDay - Optional. If `true`, includes the weekday in the formatted string. Default is `false`.
 * @returns The formatted date string in "day month" or "weekday, day month" format.
 */
export function formatDate(
  dateString: string,
  includeDay: boolean = false
): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = includeDay
    ? {
        weekday: "long",
        day: "2-digit",
        month: "short",
      }
    : {
        day: "2-digit",
        month: "short",
      };
  return date.toLocaleDateString("en-GB", options);
}

/**
 * Formats a date string to display the time in 12-hour format with a period indicator (e.g., "08:30 am").
 * Use additional styling (e.g., Tailwind class `uppercase`) to display "AM/PM" in uppercase if needed.
 * @param dateString - The ISO date string to format.
 * @returns The formatted time in 12-hour format with "am/pm".
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
