import { Artist } from 'src/artists/artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
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

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Artist {
    return this.artistService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: ArtistDto): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: ArtistDto,
  ): Artist {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
