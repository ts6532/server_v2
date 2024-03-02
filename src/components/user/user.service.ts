import {
  CreateUserDto,
  UpdateUserInfoDto,
  UserDto,
} from '@components/user/user.dto';
import { UserRepository } from '@components/user/user.repository';
import { User } from '@components/user/user.schema';

import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FilterQuery } from 'mongoose';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(
    filterQuery: FilterQuery<User>,
    options?: Record<string, unknown>,
  ) {
    return await this.userRepository.findOne(filterQuery, options);
  }

  async getUserById(id: string): Promise<UserDto> {
    return this.getUser({ _id: id });
  }

  async getUsers(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    const alreadyExist = await this.userRepository.findOne({
      email: userData.email,
    });

    if (alreadyExist)
      throw new ConflictException(
        `Пользователь с email ${userData.email} уже существует`,
      );

    const data = { ...userData };

    data.password = await bcrypt.hash(userData.password, 3);

    return await this.userRepository.create(data);
  }

  async updateUser(userData: UpdateUserInfoDto): Promise<UserDto> {
    const { id, email, firstname } = userData;
    return await this.userRepository.update({ _id: id }, { email, firstname });
  }

  async deleteUser(_id: string) {
    return await this.userRepository.deleteMany({ _id });
  }
}
