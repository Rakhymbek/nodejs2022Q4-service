import { Controller, HttpStatus, UseGuards } from '@nestjs/common';
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
import { Track } from './track.entity';
import { TrackService } from './track.service';
import { TokenGuard } from '../auth/guards/token.guard';

@UseGuards(TokenGuard)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Track[]> {
    return await this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Track> {
    return await this.trackService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: TrackDto): Promise<Track> {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: TrackDto,
  ): Promise<Track> {
    return await this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    return await this.trackService.remove(id);
  }
}
