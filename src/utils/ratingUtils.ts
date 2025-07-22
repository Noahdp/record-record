/**
 * Calculate the average rating from an array of ratings
 * @param ratings - Array of rating numbers
 * @returns Average rating rounded to 1 decimal place
 */
export function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;

  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  const average = sum / ratings.length;

  return Math.round(average * 10) / 10; // Round to 1 decimal place
}

/**
 * Get the color for a rating based on its value
 * @param rating - Rating value (typically 1-5)
 * @param scale - Maximum rating scale (default: 5)
 * @returns Color string for the rating
 */
export function getRatingColor(rating: number, scale: number = 5): string {
  const percentage = rating / scale;

  if (percentage >= 0.8) return "#ECC94B"; // Gold for excellent ratings
  if (percentage >= 0.6) return "#68D391"; // Green for good ratings
  if (percentage >= 0.4) return "#F6E05E"; // Yellow for average ratings
  if (percentage >= 0.2) return "#FC8181"; // Red for poor ratings

  return "#E2E8F0"; // Gray for very poor or no ratings
}

/**
 * Format a rating for display with optional precision
 * @param rating - Rating number to format
 * @param precision - Number of decimal places (default: 1)
 * @param scale - Maximum rating scale (default: 5)
 * @returns Formatted rating string
 */
export function formatRatingDisplay(
  rating: number,
  precision: number = 1,
  scale: number = 5
): string {
  if (rating < 0 || rating > scale) {
    return "N/A";
  }

  return `${rating.toFixed(precision)}/${scale}`;
}

/**
 * Get star configuration for a given rating
 * @param rating - Rating value
 * @param maxStars - Maximum number of stars (default: 5)
 * @returns Array of star states (filled, half, empty)
 */
export function getStarConfiguration(
  rating: number,
  maxStars: number = 5
): Array<"filled" | "half" | "empty"> {
  const stars: Array<"filled" | "half" | "empty"> = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // Full star if rating is at or above this star position
      stars.push("filled");
    } else if (rating >= i - 0.5 && rating % 1 >= 0.5) {
      // Half star if rating is between (star position - 0.5) and star position,
      // and the decimal portion is 0.5 or higher
      stars.push("half");
    } else {
      // Empty star otherwise
      stars.push("empty");
    }
  }

  return stars;
}

/**
 * Validate if a rating is within acceptable bounds
 * @param rating - Rating to validate
 * @param min - Minimum acceptable rating (default: 0)
 * @param max - Maximum acceptable rating (default: 5)
 * @returns True if valid, false otherwise
 */
export function isValidRating(
  rating: number,
  min: number = 0,
  max: number = 5
): boolean {
  return (
    typeof rating === "number" &&
    !isNaN(rating) &&
    rating >= min &&
    rating <= max
  );
}

/**
 * Convert rating from one scale to another
 * @param rating - Original rating
 * @param fromScale - Original scale maximum
 * @param toScale - Target scale maximum
 * @returns Converted rating
 */
export function convertRatingScale(
  rating: number,
  fromScale: number,
  toScale: number
): number {
  if (fromScale === toScale) return rating;

  const normalized = rating / fromScale;
  return normalized * toScale;
}

/**
 * Get rating statistics from an array of ratings
 * @param ratings - Array of rating numbers
 * @returns Object with min, max, average, and count
 */
export function getRatingStatistics(ratings: number[]): {
  min: number;
  max: number;
  average: number;
  count: number;
} {
  if (ratings.length === 0) {
    return { min: 0, max: 0, average: 0, count: 0 };
  }

  return {
    min: Math.min(...ratings),
    max: Math.max(...ratings),
    average: calculateAverageRating(ratings),
    count: ratings.length,
  };
}
