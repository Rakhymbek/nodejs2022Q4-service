import { AlbumDto } from './dto/album.dto';
import { Album } from 'src/albums/album.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { db } from 'src/db/db';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async getAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async getById(id: string): Promise<Album> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async create(createAlbumDto: AlbumDto): Promise<Album> {
    const album = this.albumRepository.create({
      id: uuidv4(),
      ...createAlbumDto,
    });

    return await this.albumRepository.save(album);
  }

  async updateAlbum(id: string, updateAlbumDto: AlbumDto): Promise<Album> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    await this.albumRepository.update(id, { ...updateAlbumDto });

    return await this.albumRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    db.tracks.forEach(async (track) => {
      track.albumId = track.albumId === id ? null : track.albumId;
    });

    db.favorites.albums = db.favorites.albums.filter(
      (album) => album.id !== id,
    );

    await this.albumRepository.delete({ id });
  }

  isUuid(id: string) {
    return validate(id);
  }
}
