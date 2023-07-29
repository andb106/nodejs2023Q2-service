import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user-password.dto';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryStorage {
  private users: User[] = [];

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
}
