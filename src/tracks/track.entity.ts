import { IsUUID, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
