import { User } from '@components/user/user.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamsWithId } from '@src/common/mongoId.validator';
import { UserService } from './user.service';
import MongooseClassSerializerInterceptor from '@database/mongooseClassSerializer.interceptor';
import { CreateUserDto, UpdateUserInfoDto } from '@components/user/user.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param() { id }: ParamsWithId) {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Patch('info')
  async updateUserInfo(@Body() userData: UpdateUserInfoDto) {
    return this.userService.updateUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }: ParamsWithId) {
    return this.userService.deleteUser(id);
  }
}
