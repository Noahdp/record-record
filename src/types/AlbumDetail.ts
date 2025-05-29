import { Track } from "./Track";
import { ArtistCredit } from "./ArtistCredit";

export interface AlbumDetail {
  id: number;
  title: string;
  artist: string;
  year?: string;
  coverImageURL?: string;
  format?: string[];
  genres?: string[];
  styles?: string[];
  tracklist: Track[];
  credits?: ArtistCredit[];
  description?: string;
}
