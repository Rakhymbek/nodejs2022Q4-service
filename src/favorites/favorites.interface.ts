import { Track } from './../tracks/track.interface';
import { Album } from 'src/albums/album.interface';
import { Artist } from 'src/artists/artist.interface';
export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
