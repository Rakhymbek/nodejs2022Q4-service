import { dbType } from './db.interface';

export const db: dbType = {
  users: [],
  albums: [],
  artists: [],
  tracks: [],
  favorites: {
    id: '',
    albums: [],
    artists: [],
    tracks: [],
  },
};
