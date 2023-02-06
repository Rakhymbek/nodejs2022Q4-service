import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';

export class Album {
  @IsUUID()
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  constructor(album: Partial<Album>) {
    Object.assign(this, album);
  }
}
