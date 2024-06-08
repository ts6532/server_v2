import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePreferencesDto } from './preferences.dto';
import { PreferencesService } from './preferences.service';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get()
  async getPreferences() {
    return await this.preferencesService.getPreferences();
  }

  @Patch()
  async update(@Body() preferencesDto: UpdatePreferencesDto) {
    return await this.preferencesService.update(preferencesDto);
  }
}
