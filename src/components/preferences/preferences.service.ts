import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/preferences.dto';
import { PreferencesRepository } from './preferences.repository';

@Injectable()
export class PreferencesService {
  constructor(private preferencesRepository: PreferencesRepository) {}

  async findOne() {
    return this.preferencesRepository.findOne({});
  }

  async update(preferencesDto: PreferencesDto) {
    const { _id, ...data } = preferencesDto;
    return this.preferencesRepository.update({ _id }, data);
  }
}
