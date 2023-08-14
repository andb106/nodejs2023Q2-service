import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { InMemoryStorageService } from 'src/storage/in-memory-storage.service';

@Injectable()
export class UserService {
  constructor(private storage: InMemoryStorageService) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.storage.createUser(createUserDto);
    return {
      id: createdUser.id,
      login: createdUser.login,
      version: createdUser.version,
      createdAt: new Date(createdUser.createdAt).getTime(),
      updatedAt: new Date(createdUser.updatedAt).getTime(),
    };
  }

  async findAll() {
    const users = await this.storage.getUser();
    return users.map((user) => {
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: new Date(user.createdAt).getTime(),
        updatedAt: new Date(user.updatedAt).getTime(),
      };
    });
  }

  async findOne(id: string) {
    const userFound = await this.storage.getUserById(id);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    return {
      id: userFound.id,
      login: userFound.login,
      version: userFound.version,
      createdAt: new Date(userFound.createdAt).getTime(),
      updatedAt: new Date(userFound.updatedAt).getTime(),
    };
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userForUpdate = await this.storage.getUserById(id);
    if (!userForUpdate) {
      throw new NotFoundException('User not found');
    }

    if (updatePasswordDto.oldPassword !== userForUpdate.password) {
      throw new ForbiddenException('Old password is wrong');
    }

    const userUpdated = await this.storage.updateUser(id, updatePasswordDto);

    return {
      id: userUpdated.id,
      login: userUpdated.login,
      version: userUpdated.version,
      createdAt: new Date(userUpdated.createdAt).getTime(),
      updatedAt: new Date(userUpdated.updatedAt).getTime(),
    };
  }

  async remove(id: string) {
    const res = await this.storage.deleteUser(id);
    if (!res) {
      throw new NotFoundException('User not found');
    }
    return this.storage.deleteUser(id);
  }
}
