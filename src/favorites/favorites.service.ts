import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';
import { Track } from '../tracks/track.entity';
import { Favorites } from './favorites.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAll(): Promise<Favorites> {
    const favorites = await this.favoritesRepository.find();

    if (favorites.length === 0) {
      return await this.favoritesRepository.save({
        artists: [],
        albums: [],
        tracks: [],
      });
    } else {
      return favorites[0];
    }
  }

  async addTrack(id: string): Promise<Track> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const favorites = await this.getAll();
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isTrackExist = favorites.tracks.includes(track);

    if (!isTrackExist) {
      favorites.tracks.push(track);
    }

    await this.favoritesRepository.save(favorites);

    return track;
  }

  async removeTrack(id: string): Promise<void> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const favorites = await this.getAll();

    const index = favorites.tracks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    favorites.tracks.splice(index, 1);

    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string): Promise<Album> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const favorites = await this.getAll();
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isAlbumExists = favorites.albums.includes(album);

    if (!isAlbumExists) {
      favorites.albums.push(album);
    }

    await this.favoritesRepository.save(favorites);

    return album;
  }

  async removeAlbum(id: string): Promise<void> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const favorites = await this.getAll();
    const index = favorites.albums.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    favorites.albums.splice(index, 1);

    await this.favoritesRepository.save(favorites);
  }

  async addArtist(id: string): Promise<Artist> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const favorites = await this.getAll();
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isArtistExists = favorites.artists.includes(artist);

    if (!isArtistExists) {
      favorites.artists.push(artist);
    }

    await this.favoritesRepository.save(favorites);

    return artist;
  }

  async removeArtist(id: string): Promise<void> {
    if (!this.isUuid(id)) {
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
    }

    const favorites = await this.getAll();
    const index = favorites.artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    favorites.artists.splice(index, 1);

    await this.favoritesRepository.save(favorites);
  }

  isUuid(id: string): boolean {
    return validate(id);
  }
}
