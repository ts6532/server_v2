import { Preferences } from '@components/preferences/preferences.schema';
import { Body, Controller, Get, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from '@database/mongooseClassSerializer.interceptor';
import { UpdatePreferencesDto } from './preferences.dto';
import { PreferencesService } from './preferences.service';

@ApiTags('preferences')
@Controller('preferences')
@UseInterceptors(MongooseClassSerializerInterceptor(Preferences))
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
