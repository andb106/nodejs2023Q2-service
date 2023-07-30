import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryStorage } from 'src/storage/in-memory-storage';

@Injectable()
export class TrackService {
  constructor(private storage: InMemoryStorage) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.createTrack(createTrackDto);
  }

  findAll() {
    return this.storage.getTracks();
  }

  findOne(id: string) {
    const trackFound = this.storage.getTrackById(id);
    if (!trackFound) {
      throw new NotFoundException('Track not found');
    }
    return trackFound;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackForUpdate = this.storage.getTrackById(id);

    if (!trackForUpdate) {
      throw new NotFoundException('User not found');
    }

    return this.storage.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    const res = this.storage.deleteTrack(id);
    if (!res) {
      throw new NotFoundException('User not found');
    }
    return res;
  }
}
