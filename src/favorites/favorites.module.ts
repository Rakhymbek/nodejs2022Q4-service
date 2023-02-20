import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artist.entity';
import { Track } from '../tracks/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Album, Artist, Track])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
