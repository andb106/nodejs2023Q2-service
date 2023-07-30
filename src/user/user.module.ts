import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryStorageModule } from 'src/storage/in-memory-storage.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [InMemoryStorageModule],
})
export class UserModule {}
