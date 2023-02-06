import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { Artist } from 'src/artists/artist.interface';
import { db } from './../db/db';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getAll(): Artist[] {
    return db.artists;
  }

  getById(id: string): Artist {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = db.artists.find((a) => a.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  create(createArtistDto: ArtistDto): Artist {
    const artist = new Artist({
      id: uuidv4(),
      ...createArtistDto,
    });

    db.artists.push(artist);

    return artist;
  }

  updateArtist(id: string, updateArtistDto: ArtistDto): Artist {
    const artist = this.getById(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const index = db.artists.findIndex((t) => t.id === id);

    const updateArtist = new Artist({ id, ...updateArtistDto });

    db.artists.splice(index, 1, updateArtist);

    return updateArtist;
  }

  remove(id: string): void {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const index = db.artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    db.tracks.forEach((track) => {
      track.artistId = track.artistId === id ? null : track.artistId;
    });

    db.artists.splice(index, 1);
  }

  isUuid(id: string) {
    return validate(id);
  }
}
