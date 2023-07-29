import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryStorage } from 'src/storage/in-memory-storage';

@Injectable()
export class UserService {
  constructor(private storage: InMemoryStorage) {}

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto-->', createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    // return `This action returns all user`;
    return this.storage.getUsers();
  }

  findOne(id: string) {
    // return `This action returns a #${id} user`;
    return this.storage.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto-->', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    // return `This action removes a #${id} user`;
    return this.storage.deleteUser(id);
  }
}
