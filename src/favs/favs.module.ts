import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { InMemoryStorageModule } from 'src/storage/in-memory-storage.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [InMemoryStorageModule],
})
export class FavsModule {}
