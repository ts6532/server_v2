import { Injectable } from '@nestjs/common';
import { PreferencesDto, UpdatePreferencesDto } from './preferences.dto';
import { PreferencesRepository } from './preferences.repository';
import { UploadService } from '@components/upload/upload.service';

@Injectable()
export class PreferencesService {
  constructor(private preferencesRepository: PreferencesRepository, private uploadService: UploadService) {}

  async getPreferences(): Promise<PreferencesDto> {
    return (await this.preferencesRepository.findOne({})).populate([
      'aboutImage',
      'mainImage',
    ]);
  }

  async isImageChanged(data: Omit<UpdatePreferencesDto, 'id'>) {
    const currentPrefs = await this.preferencesRepository.findOne({})

    if(data.aboutImage && currentPrefs.aboutImage &&  (String(data.aboutImage) !== String(currentPrefs.aboutImage))) {
      this.uploadService.deleteImage(String(currentPrefs.aboutImage))
    }

    if(data.mainImage && currentPrefs.mainImage &&  (String(data.mainImage) !== String(currentPrefs.mainImage))) {
      this.uploadService.deleteImage(String(currentPrefs.mainImage))
    }
  }

  async update(preferencesDto: UpdatePreferencesDto) {
    const { id, ...data } = preferencesDto;

    await this.isImageChanged(data);

    return await this.preferencesRepository.update({ _id: id }, data);
  }
}
