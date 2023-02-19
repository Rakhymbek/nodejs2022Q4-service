import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';
import { Track } from 'src/tracks/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string; // uuid v4

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  year: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  @OneToMany(() => Track, (track: Track) => track.albumId)
  tracks: Track[];
}
