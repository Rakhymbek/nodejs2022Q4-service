import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { Track } from './track.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  getAll(): Track[] {
    return db.tracks;
  }

  getById(id: string): Track {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = db.tracks.find((t) => t.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  create(createTrackDto: TrackDto): Track {
    const newTrack = new Track({
      id: uuidv4(),
      ...createTrackDto,
    });

    db.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: TrackDto): Track {
    const track = this.getById(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const index = db.tracks.findIndex((t) => t.id === id);

    const updateTrack = new Track({ id, ...updateTrackDto });

    db.tracks.splice(index, 1, updateTrack);

    return updateTrack;
  }

  remove(id: string) {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const index = db.tracks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    db.favorites.tracks = db.favorites.tracks.filter(
      (track) => track.id !== id,
    );

    db.tracks.splice(index, 1);
  }

  isUuid(id: string): boolean {
    return validate(id);
  }
}
