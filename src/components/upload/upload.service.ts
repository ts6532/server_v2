import { LocalImageDto } from '@components/upload/local-image.dto';
import { LocalImageRepository } from '@components/upload/upload.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(private readonly localImageRepository: LocalImageRepository) {}

  async saveImage(
    file: Express.Multer.File,
    imageData,
  ): Promise<LocalImageDto> {
    return await this.localImageRepository.create({
      location: '/' + file.path,
      filename: file.filename,
      alt: imageData.alt,
      title: imageData.title,
    });
  }
}
