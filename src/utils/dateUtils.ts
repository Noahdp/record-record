/**
 * Format a date string for review display
 * @param dateString - Date string to format
 * @returns Formatted date string or original string if parsing fails
 */
export function formatReviewDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Format an album release year for display
 * @param year - Year string or number
 * @returns Formatted year string
 */
export function formatAlbumReleaseDate(
  year: string | number | undefined
): string {
  if (!year) return "Unknown Year";

  if (typeof year === "number") {
    return year.toString();
  }

  if (typeof year === "string") {
    const yearNum = parseInt(year, 10);
    if (!isNaN(yearNum)) {
      return yearNum.toString();
    }
  }

  return "Unknown Year";
}

/**
 * Format a date range for display
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: string, endDate: string): string {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startFormatted = start.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const endFormatted = end.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return `${startFormatted} - ${endFormatted}`;
  } catch {
    return `${startDate} - ${endDate}`;
  }
}

/**
 * Check if a date string is valid
 * @param dateString - Date string to validate
 * @returns True if valid, false otherwise
 */
export function isValidDate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}
