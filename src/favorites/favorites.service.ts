import { Track } from './../tracks/track.interface';
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

  isUuid(id: string): boolean {
    return validate(id);
  }
}
