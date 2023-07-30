import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryStorageService } from 'src/storage/in-memory-storage.service';
import { FavoritesDto } from './dto/favorites.dto';

@Injectable()
export class FavsService {
  constructor(private storage: InMemoryStorageService) {}

  findAll() {
    const res = new FavoritesDto();
    const favoritesIds = this.storage.getFavoritesIds();

    res.albums = favoritesIds.albums.map((id) => this.storage.getAlbumById(id));

    res.artists = favoritesIds.artists.map((id) =>
      this.storage.getArtistById(id),
    );

    res.tracks = favoritesIds.tracks.map((id) => this.storage.getTrackById(id));

    return res;
  }

  addArtistToFavorites(id: string) {
    const res = this.storage.addArtistToFavorites(id);
    if (!res) {
      throw new UnprocessableEntityException(`Artist doesn't exist`);
    }
    return res;
  }

  addAlbumToFavorites(id: string) {
    const res = this.storage.addAlbumToFavorites(id);
    if (!res) {
      throw new UnprocessableEntityException(`Album doesn't exist`);
    }
    return res;
  }

  addTrackToFavorites(id: string) {
    const res = this.storage.addTrackToFavorites(id);
    if (!res) {
      throw new UnprocessableEntityException(`Track doesn't exist`);
    }
    return res;
  }

  removeArtist(id: string) {
    const res = this.storage.deleteArtistFromFavorites(id);
    if (!res) {
      throw new NotFoundException('Artist not found in favorites');
    }
    return res;
  }

  removeAlbum(id: string) {
    const res = this.storage.deleteAlbumFromFavorites(id);
    if (!res) {
      throw new NotFoundException('Album not found in favorites');
    }
    return res;
  }

  removeTrack(id: string) {
    const res = this.storage.deleteTrackFromFavorites(id);
    if (!res) {
      throw new NotFoundException('Track not found in favorites');
    }
    return res;
  }
}
