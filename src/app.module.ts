import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { InMemoryStorageModule } from './storage/in-memory-storage.module';

@Module({
  imports: [UserModule, TrackModule, InMemoryStorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
