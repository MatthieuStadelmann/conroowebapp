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
  includeDay: boolean = false,
  includeYear: boolean = false
): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    ...(includeDay && { weekday: "long" }),
    ...(includeYear && { year: "numeric" }),
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  if (includeDay && includeYear) {
    const parts = formattedDate.split(" ");
    return `${parts[0]}, ${parts[1]} ${parts[2]}, ${parts[3]}`;
  }

  // Return the formatted date
  return formattedDate;
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
  });
}
