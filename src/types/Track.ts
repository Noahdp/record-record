import { ArtistCredit } from "./ArtistCredit";

export interface Track {
  position?: string;
  title: string;
  duration?: string;
  artists?: ArtistCredit[];
}