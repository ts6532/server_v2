import { Body, Controller, Get, Put } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/preferences.dto';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get()
  async getPreferences() {
    return await this.preferencesService.getPreferences();
  }

  @Put()
  async update(@Body() preferencesDto: PreferencesDto) {
    return await this.preferencesService.update(preferencesDto);
  }
}
