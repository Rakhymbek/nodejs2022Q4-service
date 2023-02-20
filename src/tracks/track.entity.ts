import { IsUUID, IsOptional } from 'class-validator';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string; // uuid v4

  @Column({ nullable: false })
  name: string;

  @IsOptional()
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @IsOptional()
  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column({ nullable: false })
  duration: number; // integer number

  @ManyToOne(() => Album, (album: Album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album[];

  @ManyToOne(() => Artist, (artist: Artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}
