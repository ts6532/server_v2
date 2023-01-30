import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(_id: string): Promise<User> {
    return this.userRepository.findOne({ _id });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(userData: UserDto): Promise<User> {
    const data = { ...userData };

    data.password = await bcrypt.hash(userData.password, 3);

    return this.userRepository.create(data);
  }

  async updateUser(_id: string, userData: UserDto): Promise<User> {
    return this.userRepository.update({ _id }, userData);
  }

  async deleteUser(_id: string): Promise<boolean> {
    return this.userRepository.deleteMany({ _id });
  }
}
