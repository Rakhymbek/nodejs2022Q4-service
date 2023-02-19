import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { Track } from './track.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async getById(id: string): Promise<Track> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async create(createTrackDto: TrackDto): Promise<Track> {
    const newTrack = this.trackRepository.create({
      id: uuidv4(),
      ...createTrackDto,
    });

    return await this.trackRepository.save(newTrack);
  }

  async updateTrack(id: string, updateTrackDto: TrackDto): Promise<Track> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.update(id, { ...updateTrackDto });

    return await this.trackRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.trackRepository.delete({ id });

    db.favorites.tracks = db.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  isUuid(id: string): boolean {
    return validate(id);
  }
}
