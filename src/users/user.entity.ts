import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 1 })
  version: number;

  @Column({ default: Math.floor(Date.now() / 1000) })
  createdAt: number;

  @Column({ default: Math.floor(Date.now() / 1000) })
  updatedAt: number;
}
