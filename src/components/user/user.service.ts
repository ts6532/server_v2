import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { IMessage } from '@src/types/general';
import { UserDto } from '@components/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(_id: string): Promise<UserDto> {
    return new UserDto(await this.userRepository.findOne({ _id }));
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async getUsers(): Promise<UserDto[]> {
    const res = await this.userRepository.find({});
    return res.map((el) => new UserDto(el));
  }

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    try {
      const data = { ...userData };
      data.password = await bcrypt.hash(userData.password, 3);
      return new UserDto(await this.userRepository.create(data));
    } catch (e) {
      throw new HttpException(
        'Ошибка при создании пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userData: UpdateUserDto): Promise<UserDto> {
    try {
      const { _id, ...data } = userData;
      return new UserDto(await this.userRepository.update({ _id }, data));
    } catch (e) {
      throw new HttpException(
        'Ошибка при обновлении пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(_id: string): Promise<IMessage> {
    try {
      await this.userRepository.deleteMany({ _id });
      return { message: 'Пользователь удален' };
    } catch (e) {
      throw new HttpException(
        'Ошибка при удалении пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
