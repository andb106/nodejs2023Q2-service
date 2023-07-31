import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryStorageService } from 'src/storage/in-memory-storage.service';

@Injectable()
export class AlbumService {
  constructor(private storage: InMemoryStorageService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.storage.getAlbums();
  }

  findOne(id: string) {
    const albumFound = this.storage.getAlbumById(id);
    if (!albumFound) {
      throw new NotFoundException('Album not found');
    }
    return albumFound;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumForUpdate = this.storage.getAlbumById(id);

    if (!albumForUpdate) {
      throw new NotFoundException('Album not found');
    }

    return this.storage.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    const res = this.storage.deleteAlbum(id);
    if (!res) {
      throw new NotFoundException('Album not found');
    }
    return res;
  }
}
