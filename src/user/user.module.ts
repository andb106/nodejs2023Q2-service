import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryStorage } from 'src/storage/in-memory-storage';

@Module({
  controllers: [UserController],
  providers: [UserService, InMemoryStorage],
})
export class UserModule {}
