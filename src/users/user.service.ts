import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { db } from 'src/db/db';

@Injectable()
export class UserService {
  getAll(): User[] {
    return db.users;
  }

  getById(id: string): User {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }
    const user = db.users.find((u) => u.id === id);
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
    const newUser: User = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    db.users.push(newUser);
    return newUser;
  }

  remove(id: string): boolean {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }

    const index = db.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    db.users.splice(index, 1);
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
    const newUser: User = new User({
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });
    db.users = db.users.map((user) =>
      user.id === newUser.id ? { ...newUser } : user,
    );

    return newUser;
  }

  isUuid(id: string): boolean {
    return validate(id);
  }
}
