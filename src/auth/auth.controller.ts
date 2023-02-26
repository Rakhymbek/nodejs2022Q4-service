import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async signUp(@Body() userDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(userDto);
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  async signIn(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto);
  }

  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() tokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(tokenDto);
  }
}
