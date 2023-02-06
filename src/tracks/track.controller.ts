import { Controller, HttpStatus } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { TrackDto } from './dto/track.dto';
import { Track } from './track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Track {
    const user = this.trackService.getById(id);
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: TrackDto): Track {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: TrackDto,
  ): Track {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
