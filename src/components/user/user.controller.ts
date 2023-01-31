import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async getUsers() {
    const res = await this.userService.getUsers();
    return res.map((el) => new UserDto(el));
  }

  @Get('user')
  async getUser(@Query('_id') _id: string) {
    return new UserDto(await this.userService.getUserById(_id));
  }

  @Post('user')
  async createUser(@Body() userData: CreateUserDto) {
    return new UserDto(await this.userService.createUser(userData));
  }

  @Put('user')
  async updateUser(@Body() userData: UpdateUserDto) {
    return new UserDto(await this.userService.updateUser(userData));
  }

  @Delete('user')
  async deleteUser(@Body('_id') _id: string) {
    return this.userService.deleteUser(_id);
  }
}
