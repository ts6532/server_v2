import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';

import { SessionAuthGuard } from '@components/auth/session-auth.guard';

import { ApiTags } from '@nestjs/swagger';
import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/preferences.dto';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get()
  async getPreferences(): Promise<PreferencesDto> {
    return await this.preferencesService.getPreferences();
  }

  @UseGuards(SessionAuthGuard)
  @Put()
  async update(
    @Body() preferencesDto: PreferencesDto,
  ): Promise<PreferencesDto> {
    return await this.preferencesService.update(preferencesDto);
  }
}
