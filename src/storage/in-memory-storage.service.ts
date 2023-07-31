import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favs/entities/fav.entity';
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
  private albums: Album[] = [];
  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

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

      this.deleteTrackFromFavorites(id);

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

      const albumByArtist = this.albums.find(
        (album) => album.artistId === artistToDelete.id,
      );

      if (albumByArtist) {
        Object.assign(albumByArtist, { artistId: null });
      }

      this.deleteArtistFromFavorites(id);

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

  // ALBUMS
  getAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  deleteAlbum(id: string) {
    const albumToDelete = this.albums.find((album) => album.id === id);

    if (albumToDelete) {
      this.albums = this.albums.filter((artist) => artist.id !== id);

      const trackByAlbum = this.tracks.find(
        (track) => track.albumId === albumToDelete.id,
      );

      if (trackByAlbum) {
        Object.assign(trackByAlbum, { albumId: null });
      }

      this.deleteAlbumFromFavorites(id);

      return true;
    }

    return false;
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album();

    Object.assign(newAlbum, {
      id: uuidv4(),
      ...createAlbumDto,
    });

    this.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const artistForUpdate = this.albums.find((album) => album.id === id);
    return Object.assign(artistForUpdate, updateAlbumDto);
  }

  // FAVORITES

  getFavoritesIds() {
    return this.favorites;
  }

  addArtistToFavorites(id: string) {
    const artistFound = this.getArtistById(id);

    if (!artistFound) {
      return false;
    }

    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }

    return true;
  }

  addAlbumToFavorites(id: string) {
    const albumFound = this.getAlbumById(id);

    if (!albumFound) {
      return false;
    }

    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }

    return true;
  }

  addTrackToFavorites(id: string) {
    const trackFound = this.getTrackById(id);

    if (!trackFound) {
      return false;
    }

    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }

    return true;
  }

  deleteArtistFromFavorites(id: string) {
    if (!this.favorites.artists.includes(id)) {
      return false;
    }

    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    return true;
  }

  deleteAlbumFromFavorites(id: string) {
    if (!this.favorites.albums.includes(id)) {
      return false;
    }

    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );

    return true;
  }

  deleteTrackFromFavorites(id: string) {
    if (!this.favorites.tracks.includes(id)) {
      return false;
    }

    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );

    return true;
  }
}
