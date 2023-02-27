import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import * as process from 'process';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDto: CreateUserDto) {
    const userHashPassword = await hash(
      userDto.password,
      Number(process.env.CRYPT_SALT),
    );
    return this.userService.create({
      ...userDto,
      password: userHashPassword,
    });
  }

  async login(userDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ login: userDto.login });
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.FORBIDDEN);
    }

    const isPasswordSame = await compare(userDto.password, user.password);
    if (isPasswordSame) {
      return await this.generateTokens({ id: user.id, login: user.login });
    } else {
      throw new HttpException(
        'login or password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async refreshToken(tokenDto: RefreshTokenDto) {
    const verifiedUser = this.jwtService.verify(tokenDto.refreshToken);
    return await this.generateTokens({
      id: verifiedUser.id,
      login: verifiedUser.login,
    });
  }

  async generateTokens(
    payload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    return { accessToken, refreshToken };
  }
}
