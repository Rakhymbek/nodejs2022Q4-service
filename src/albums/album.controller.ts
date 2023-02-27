import { AlbumDto } from './dto/album.dto';
import { Album } from 'src/albums/album.entity';
import { AlbumService } from './album.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from '../auth/guards/token.guard';

@UseGuards(TokenGuard)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Album[]> {
    return await this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Album> {
    const user = await this.albumService.getById(id);
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: AlbumDto): Promise<Album> {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: AlbumDto,
  ): Promise<Album> {
    return await this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    return await this.albumService.remove(id);
  }
}
