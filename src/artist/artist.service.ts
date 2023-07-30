import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryStorageService } from 'src/storage/in-memory-storage.service';

@Injectable()
export class ArtistService {
  constructor(private storage: InMemoryStorageService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.createArtist(createArtistDto);
  }

  findAll() {
    return this.storage.getArtists();
  }

  findOne(id: string) {
    const artistFound = this.storage.getArtistById(id);
    if (!artistFound) {
      throw new NotFoundException('Artist not found');
    }
    return artistFound;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistForUpdate = this.storage.getArtistById(id);

    if (!artistForUpdate) {
      throw new NotFoundException('Artist not found');
    }

    return this.storage.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    const res = this.storage.deleteArtist(id);
    if (!res) {
      throw new NotFoundException('Artist not found');
    }
    return res;
  }
}
