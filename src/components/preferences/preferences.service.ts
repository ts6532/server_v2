import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/preferences.dto';
import { PreferencesRepository } from './preferences.repository';

@Injectable()
export class PreferencesService {
  constructor(private preferencesRepository: PreferencesRepository) {}

  async getPreferences(): Promise<PreferencesDto> {
    return new PreferencesDto(await this.preferencesRepository.findOne({}));
  }

  async update(preferencesDto: PreferencesDto) {
    const { _id, ...data } = preferencesDto;
    return new PreferencesDto(
      await this.preferencesRepository.update({ _id }, data),
    );
  }
}
