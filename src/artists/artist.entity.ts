import { IsUUID, IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
