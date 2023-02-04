import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(
        'Login and password are required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const { password, ...restUserData } = newUser;
    return restUserData;
  }

  remove(id: string): boolean {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }

    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.users.splice(index, 1);
    return true;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }

    const user = this.getById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  isUuid(id: string): boolean {
    return validate(id);
  }
}
