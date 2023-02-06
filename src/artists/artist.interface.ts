import { IsUUID, IsBoolean, IsNotEmpty } from 'class-validator';

export class Artist {
  @IsUUID()
  id: string; // uuid v4

  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;

  constructor(artist: Partial<Artist>) {
    Object.assign(this, artist);
  }
}
