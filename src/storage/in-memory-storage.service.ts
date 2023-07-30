import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user-password.dto';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryStorageService {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];

  constructor() {
    console.log('database created');
  }

  //USERS

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: string) {
    const userToDelete = this.users.find((user) => user.id === id);
    if (userToDelete) {
      this.users = this.users.filter((user) => user.id !== id);
      return true;
    }
    return false;
  }

  createUser(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const newUser = new User();

    const newUserData: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    Object.assign(newUser, newUserData);

    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userForUpdate = this.users.find((user) => user.id === id);

    const newUserData = {
      password: updatePasswordDto.newPassword,
      version: ++userForUpdate.version,
      updatedAt: Date.now(),
    };

    return Object.assign(userForUpdate, newUserData);
  }

  //TRACKS

  getTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  deleteTrack(id: string) {
    const trackToDelete = this.tracks.find((track) => track.id === id);
    if (trackToDelete) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
      return true;
    }
    return false;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = new Track();

    Object.assign(newTrack, {
      id: uuidv4(),
      ...createTrackDto,
    });

    this.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const userForUpdate = this.tracks.find((track) => track.id === id);
    return Object.assign(userForUpdate, updateTrackDto);
  }

  // ARTISTS

  getArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  deleteArtist(id: string) {
    const artistToDelete = this.artists.find((artist) => artist.id === id);

    if (artistToDelete) {
      this.artists = this.artists.filter((artist) => artist.id !== id);

      const trackByArtist = this.tracks.find(
        (track) => track.artistId === artistToDelete.id,
      );

      if (trackByArtist) {
        Object.assign(trackByArtist, { artistId: null });
      }

      return true;
    }

    return false;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist();

    Object.assign(newArtist, {
      id: uuidv4(),
      ...createArtistDto,
    });

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artistForUpdate = this.artists.find((artist) => artist.id === id);
    return Object.assign(artistForUpdate, updateArtistDto);
  }
}
