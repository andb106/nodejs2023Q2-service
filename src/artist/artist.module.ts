import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryStorageModule } from 'src/storage/in-memory-storage.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [InMemoryStorageModule],
})
export class ArtistModule {}
