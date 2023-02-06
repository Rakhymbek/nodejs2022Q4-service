import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class User {
  @IsUUID()
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
