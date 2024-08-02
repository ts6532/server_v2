import { CreateUserDto, UpdateUserInfoDto } from '@components/user/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamsWithId } from '@src/common/mongoId.validator';
import { UserService } from './user.service';
import { AuthenticatedGuard } from '@components/auth/authenticated.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getUser(@Param() { id }: ParamsWithId) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('info')
  async updateUserInfo(@Body() userData: UpdateUserInfoDto) {
    return this.userService.updateUser(userData);
  }
  
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deleteUser(@Param() { id }: ParamsWithId) {
    return this.userService.deleteUser(id);
  }
}
