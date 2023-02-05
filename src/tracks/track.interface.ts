import { IsUUID, IsOptional } from 'class-validator';

export class Track {
  @IsUUID()
  id: string; // uuid v4

  name: string;

  @IsOptional()
  artistId: string | null; // refers to Artist
  @IsOptional()
  albumId: string | null; // refers to Album

  duration: number; // integer number

  constructor(track: Partial<Track>) {
    Object.assign(this, track);
  }
}
