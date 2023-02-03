import { SessionAuthGuard } from '@components/auth/session-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@UseGuards(SessionAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    const res = await this.userService.getUsers();
    return res.map((el) => new UserDto(el));
  }

  @Get(':_id')
  async getUser(@Param('_id') _id: string) {
    return this.userService.getUserById(_id);
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return this.userService.createUser(userData);
  }

  @Put()
  async updateUser(@Body() userData: UpdateUserDto) {
    console.log('userData', userData);
    return this.userService.updateUser(userData);
  }

  @Delete(':_id')
  async deleteUser(@Param('_id') _id: string) {
    return this.userService.deleteUser(_id);
  }
}
