import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(_id: string): Promise<User> {
    return this.userRepository.findOne({ _id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const data = { ...userData };

    data.password = await bcrypt.hash(userData.password, 3);

    return this.userRepository.create(data);
  }

  async updateUser(userData: UpdateUserDto): Promise<User> {
    const { _id, ...data } = userData;
    return this.userRepository.update({ _id }, data);
  }

  async deleteUser(_id: string): Promise<boolean> {
    return this.userRepository.deleteMany({ _id });
  }
}
