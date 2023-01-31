import { SessionAuthGuard } from '@components/auth/session-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
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

  @UseGuards(SessionAuthGuard)
  @Get('users')
  async getUsers() {
    const res = await this.userService.getUsers();
    return res.map((el) => new UserDto(el));
  }

  @UseGuards(SessionAuthGuard)
  @Get('user')
  async getUser(@Query('_id') _id: string) {
    return new UserDto(await this.userService.getUserById(_id));
  }

  @UseGuards(SessionAuthGuard)
  @Post('user')
  async createUser(@Body() userData: CreateUserDto) {
    return new UserDto(await this.userService.createUser(userData));
  }

  @UseGuards(SessionAuthGuard)
  @Put('user')
  async updateUser(@Body() userData: UpdateUserDto) {
    return new UserDto(await this.userService.updateUser(userData));
  }

  @UseGuards(SessionAuthGuard)
  @Delete('user')
  async deleteUser(@Body('_id') _id: string) {
    return this.userService.deleteUser(_id);
  }
}
