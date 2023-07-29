import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InMemoryStorage {
  private users: User[] = [
    {
      id: '1',
      login: 'aaa',
      password: '123',
      version: 1111,
      createdAt: 22222,
      updatedAt: 3333,
    },
    {
      id: '2',
      login: 'bbb',
      password: '3333',
      version: 4444,
      createdAt: 5555,
      updatedAt: 6666,
    },
  ];

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
}
