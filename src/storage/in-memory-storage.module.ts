import { Module } from '@nestjs/common';

import { InMemoryStorageService } from 'src/storage/in-memory-storage.service';

@Module({
  exports: [InMemoryStorageService],
  providers: [InMemoryStorageService],
})
export class InMemoryStorageModule {}
