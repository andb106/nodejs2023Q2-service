import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryStorageModule } from 'src/storage/in-memory-storage.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [InMemoryStorageModule],
})
export class AlbumModule {}
