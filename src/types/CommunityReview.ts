export interface CommunityReview {
  id: number;
  albumId: number;
  user: string;
  rating: number; // e.g., 1-5
  comment: string;
  date: string; // ISO date string
}