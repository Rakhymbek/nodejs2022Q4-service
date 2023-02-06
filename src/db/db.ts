import { Favorites } from './../favorites/favorites.interface';
import { dbType } from './db.interface';

export const db: dbType = {
  users: [],
  albums: [],
  artists: [],
  tracks: [],
  favorites: {
    albums: [],
    artists: [],
    tracks: [],
  },
};
