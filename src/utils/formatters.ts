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
 * Formats a date string to display the day and abbreviated month (e.g., "13 Jan").
 * @param dateString - The ISO date string to format.
 * @returns The formatted date in "day month" format (e.g., "13 Jan").
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
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
