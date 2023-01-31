import { SessionAuthGuard } from '@components/auth/session-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(SessionAuthGuard)
  @Get()
  async getUsers() {
    const res = await this.userService.getUsers();
    return res.map((el) => new UserDto(el));
  }

  @UseGuards(SessionAuthGuard)
  @Get(':_id')
  async getUser(@Param('_id') _id: string) {
    return new UserDto(await this.userService.getUserById(_id));
  }

  @UseGuards(SessionAuthGuard)
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return new UserDto(await this.userService.createUser(userData));
  }

  @UseGuards(SessionAuthGuard)
  @Put()
  async updateUser(@Body() userData: UpdateUserDto) {
    return new UserDto(await this.userService.updateUser(userData));
  }

  @UseGuards(SessionAuthGuard)
  @Delete(':_id')
  async deleteUser(@Param('_id') _id: string) {
    return this.userService.deleteUser(_id);
  }
}
