import { AlbumDto } from './dto/album.dto';
import { Album } from 'src/albums/album.interface';
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
} from '@nestjs/common';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Album {
    const user = this.albumService.getById(id);
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: AlbumDto): Album {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: AlbumDto,
  ): Album {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
