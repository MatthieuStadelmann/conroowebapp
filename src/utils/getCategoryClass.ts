import {
  CATEGORY_GREEN,
  CATEGORY_YELLOW,
  CATEGORY_RED,
} from "../constants/categories.ts";

/**
 * Retrieves the CSS class corresponding to a given category.
 * Maps predefined categories (e.g., "green", "yellow", "red") to their associated Tailwind classes.
 *
 * These category classes help apply different background colors or styles
 * based on the category of the item being rendered.
 *
 * @param category - The category identifier (e.g., "green", "yellow", "red").
 * @returns The CSS class name associated with the given category.
 *          If the category is unknown or not provided, a default class (`bg-gray-200`) will be returned.
 */
export function getCategoryClass(category: string): string {
  switch (category) {
    case CATEGORY_GREEN:
      return "bg-greenCategory";
    case CATEGORY_YELLOW:
      return "bg-yellowCategory";
    case CATEGORY_RED:
      return "bg-redCategory";
    default:
      return "bg-gray-200";
  }
}
