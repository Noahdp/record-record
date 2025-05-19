export interface Album {
  id: number;
  title: string;
  artist: string;
  year?: string;
  coverImageURL?: string;
  format?: string[];
  isMasterRelease?: boolean;
}