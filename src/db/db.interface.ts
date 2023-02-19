import { Favorites } from './../favorites/favorites.interface';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';
import { User } from 'src/users/user.entity';

export interface dbType {
  users: User[];
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  favorites: Favorites;
}
