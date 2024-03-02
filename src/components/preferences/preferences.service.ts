import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './preferences.dto';
import { PreferencesRepository } from './preferences.repository';

@Injectable()
export class PreferencesService {
  constructor(private preferencesRepository: PreferencesRepository) {}

  async getPreferences(): Promise<PreferencesDto> {
    return await this.preferencesRepository.findOne({});
  }

  async update(preferencesDto: PreferencesDto) {
    const { id, ...data } = preferencesDto;
    return await this.preferencesRepository.update({ _id: id }, data);
  }
}
