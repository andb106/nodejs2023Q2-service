import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { InMemoryStorage } from 'src/storage/in-memory-storage';

@Injectable()
export class UserService {
  constructor(private storage: InMemoryStorage) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.createUser(createUserDto);
  }

  findAll() {
    return this.storage.getUsers();
  }

  findOne(id: string) {
    const userFound = this.storage.getUserById(id);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    return this.storage.getUserById(id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userForUpdate = this.storage.getUserById(id);

    if (!userForUpdate) {
      throw new NotFoundException('User not found');
    }

    if (updatePasswordDto.oldPassword !== userForUpdate.password) {
      throw new ForbiddenException('Old password is wrong');
    }

    return this.storage.updateUser(id, updatePasswordDto);
  }

  remove(id: string) {
    const res = this.storage.deleteUser(id);
    if (!res) {
      throw new NotFoundException('User not found');
    }
    return this.storage.deleteUser(id);
  }
}
