import { IsUUID, IsBoolean, IsNotEmpty } from 'class-validator';
import { Track } from 'src/tracks/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string; // uuid v4

  @Column()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track: Track) => track.artist)
  tracks: Track[];
}
