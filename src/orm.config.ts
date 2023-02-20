import { config } from 'dotenv';
import { User } from './users/user.entity';
import { DataSourceOptions } from 'typeorm';
import { Artist } from './artists/artist.entity';
import { Album } from './albums/album.entity';
import { Track } from './tracks/track.entity';
import { Favorites } from './favorites/favorites.entity';

config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.DB_PORT) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [User, Artist, Album, Track, Favorites],
  migrations: ['migrations/**/*{.ts,.js}'],
  logging: true,
  synchronize: true,
} as DataSourceOptions;
