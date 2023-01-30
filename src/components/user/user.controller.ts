import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserWithIdDto } from './dto/user_with_id.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('user')
  async getUser(@Query() query: { _id: string }): Promise<User> {
    return this.userService.getUserById(query._id);
  }

  @Post('user')
  async createUser(@Body() userData: UserDto) {
    return this.userService.createUser(userData);
  }

  @Put('user')
  async updateUser(@Body() userData: UserWithIdDto) {
    const { _id, ...data } = userData;
    return this.userService.updateUser(_id, data);
  }

  @Delete('user')
  async deleteUser(@Body() data: { _id: string }) {
    return this.userService.deleteUser(data._id);
  }
}
