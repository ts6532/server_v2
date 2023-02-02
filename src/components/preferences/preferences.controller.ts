import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';

import { SessionAuthGuard } from '@components/auth/session-auth.guard';

import { ApiTags } from '@nestjs/swagger';
import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/preferences.dto';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @UseGuards(SessionAuthGuard)
  @Get()
  async findOne() {
    return new PreferencesDto(await this.preferencesService.findOne());
  }

  @UseGuards(SessionAuthGuard)
  @Put()
  async update(@Body() preferencesDto: PreferencesDto) {
    return new PreferencesDto(
      await this.preferencesService.update(preferencesDto),
    );
  }
}
