import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryStorageModule } from 'src/storage/in-memory-storage.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [InMemoryStorageModule],
})
export class TrackModule {}
