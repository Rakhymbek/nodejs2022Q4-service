import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.interface';
import { Track } from '../tracks/track.entity';
import { Favorites } from './favorites.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { db } from 'src/db/db';

@Injectable()
export class FavoritesService {
  getAll(): Favorites {
    return db.favorites;
  }

  addTrack(id: string): Track {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = db.tracks.find((t) => t.id === id);
    if (!track) {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    db.favorites.tracks.push(track);
    return track;
  }

  removeTrack(id: string): void {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const index = db.favorites.tracks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    db.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string): Album {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = db.albums.find((a) => a.id === id);
    if (!album) {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    db.favorites.albums.push(album);
    return album;
  }

  removeAlbum(id: string): void {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const index = db.favorites.albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    db.favorites.albums.splice(index, 1);
  }

  addArtist(id: string): Artist {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = db.artists.find((a) => a.id === id);
    if (!artist) {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    db.favorites.artists.push(artist);
    return artist;
  }

  removeArtist(id: string): void {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const index = db.favorites.artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    db.favorites.artists.splice(index, 1);
  }

  isUuid(id: string): boolean {
    return validate(id);
  }
}
