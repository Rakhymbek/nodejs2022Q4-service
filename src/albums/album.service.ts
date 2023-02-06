import { AlbumDto } from './dto/album.dto';
import { Album } from 'src/albums/album.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { db } from 'src/db/db';

@Injectable()
export class AlbumService {
  getAll(): Album[] {
    return db.albums;
  }

  getById(id: string): Album {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = db.albums.find((a) => a.id === id);
    if (!album) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  create(createAlbumDto: AlbumDto): Album {
    const album = new Album({
      id: uuidv4(),
      ...createAlbumDto,
    });

    db.albums.push(album);

    return album;
  }

  updateAlbum(id: string, updateAlbumDto: AlbumDto): Album {
    const album = this.getById(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const index = db.albums.findIndex((a) => a.id === id);

    const updateAlbum = new Album({ id, ...updateAlbumDto });

    db.albums.splice(index, 1, updateAlbum);

    return updateAlbum;
  }

  remove(id: string): void {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const index = db.albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    db.tracks.forEach((track) => {
      track.albumId = track.albumId === id ? null : track.albumId;
    });

    db.favorites.albums = db.favorites.albums.filter(
      (album) => album.id !== id,
    );

    db.albums.splice(index, 1);
  }

  isUuid(id: string) {
    return validate(id);
  }
}
