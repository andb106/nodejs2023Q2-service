import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryStorage } from 'src/storage/in-memory-storage';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryStorage],
})
export class TrackModule {}
