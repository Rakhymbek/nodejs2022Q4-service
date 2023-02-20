import { Track } from '../tracks/track.entity';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class Favorites {
  @IsUUID()
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  artists: Artist[]; // favorite artists

  @ManyToMany(() => Album, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  albums: Album[]; // favorite albums

  @ManyToMany(() => Track, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  tracks: Track[]; // favorite tracks
}
