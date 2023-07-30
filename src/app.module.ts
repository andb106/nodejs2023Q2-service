import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { InMemoryStorageModule } from './storage/in-memory-storage.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, TrackModule, InMemoryStorageModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
