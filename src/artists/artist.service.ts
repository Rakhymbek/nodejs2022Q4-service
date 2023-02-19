import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { Artist } from 'src/artists/artist.entity';
import { db } from './../db/db';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async getAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async create(createArtistDto: ArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create({
      id: uuidv4(),
      ...createArtistDto,
    });

    return await this.artistRepository.save(artist);
  }

  async updateArtist(id: string, updateArtistDto: ArtistDto): Promise<Artist> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await this.artistRepository.update(id, { ...updateArtistDto });

    return await this.artistRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await this.artistRepository.delete({ id });

    db.tracks.forEach((track) => {
      track.artistId = track.artistId === id ? null : track.artistId;
    });

    db.favorites.artists = db.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }

  isUuid(id: string) {
    return validate(id);
  }
}
