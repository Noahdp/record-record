export interface DiscogsReviewResponse {
  id?: number;
  username?: string;
  user?:
    | {
        id: number;
        username: string;
        avatar_url: string;
        url: string;
      }
    | string;
  rating?: number;
  review?: string;
  review_plaintext?: string;
  review_html?: string;
  comment?: string;
  text?: string;
  posted?: string;
  date?: string;
  last_modified?: string;
  date_added?: string;
  type?: string;
  status?: string;
  message_type?: string;
}
