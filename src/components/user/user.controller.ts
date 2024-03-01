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
import { UserService } from './user.service';
import { CreateUserDto } from '@components/user/dto/create-user.dto';
import { UpdateUserDto } from '@components/user/dto/update-user.dto';

import { AuthenticatedGuard } from '@components/auth/authenticated.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':_id')
  async getUser(@Param('_id') _id: string) {
    return this.userService.getUser({ _id });
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthenticatedGuard)
  @Put()
  async updateUser(@Body() userData: UpdateUserDto) {
    return this.userService.updateUser(userData);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':_id')
  async deleteUser(@Param('_id') _id: string) {
    return this.userService.deleteUser(_id);
  }
}
