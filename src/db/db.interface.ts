import { Album } from 'src/albums/album.interface';
import { Artist } from 'src/artists/artist.interface';
import { Track } from 'src/tracks/track.interface';
import { User } from 'src/users/user.interface';

export interface dbType {
  users: User[];
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
}
