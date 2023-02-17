import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { db } from 'src/db/db';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    console.log('USER IS HERE?', user);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(
        'Login and password are required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.userRepository.create({
      id: uuidv4(),
      ...createUserDto,
    });

    return await this.userRepository.save(newUser);
  }

  async remove(id: string) {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete({ id });
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    if (this.isObjectEmpty(updatePasswordDto)) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }

    if (!this.isUuid(id)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Math.floor(Date.now() / 1000),
    });

    return await this.userRepository.findOneBy({ id });
  }

  isUuid(id: string): boolean {
    return validate(id);
  }

  isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
