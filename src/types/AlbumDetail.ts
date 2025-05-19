import { Track } from "./Track";
import { ArtistCredit } from "./ArtistCredit";

export interface AlbumDetail {
  id: number;
  title: string;
  artist: string;
  year?: string;
  coverImageURL?: string;
  format?: string[];
  isMasterRelease?: boolean;
  genres?: string[];
  styles?: string[];
  tracklist: Track[];
  credits?: ArtistCredit[];
  description?: string;
}