import { UserDocument } from '@components/user/schemas/user.schema';
import { UserRepository } from '@components/user/user.repository';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FilterQuery } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(
    filterQuery: FilterQuery<UserDocument>,
    options?: Record<string, unknown>,
  ) {
    return await this.userRepository.findOne(filterQuery, options);
  }

  async getUsers() {
    return await this.userRepository.find({});
  }

  async createUser(userData: CreateUserDto) {
    const alreadyExist = await this.userRepository.findOne({
      email: userData.email,
    });

    if (alreadyExist)
      throw new ConflictException(
        `Пользователь с email ${userData.email} уже существует`,
      );

    try {
      const data = { ...userData };

      data.password = await bcrypt.hash(userData.password, 3);

      return await this.userRepository.create(data);
    } catch (e) {
      throw new InternalServerErrorException(
        e,
        'Ошибка при создании пользователя',
      );
    }
  }

  async updateUser(userData: UpdateUserDto): Promise<UserDocument> {
    try {
      const { _id, ...data } = userData;
      return await this.userRepository.update({ _id }, data);
    } catch (e) {
      throw new InternalServerErrorException(
        e,
        'Ошибка при обновлении пользователя',
      );
    }
  }

  async deleteUser(_id: string) {
    try {
      await this.userRepository.deleteMany({ _id });
      return { message: 'Пользователь удален' };
    } catch (e) {
      throw new InternalServerErrorException(
        e,
        'Ошибка при удалении пользователя',
      );
    }
  }
}
