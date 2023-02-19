import { Track } from '../tracks/track.entity';
import { Album } from 'src/albums/album.interface';
import { Artist } from 'src/artists/artist.entity';
export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
