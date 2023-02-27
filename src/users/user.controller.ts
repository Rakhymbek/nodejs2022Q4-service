import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TokenGuard } from '../auth/guards/token.guard';

@UseGuards(TokenGuard)
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
