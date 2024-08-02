import { LocalImageDto } from '@components/upload/local-image.dto';
import { LocalImageRepository } from '@components/upload/upload.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { unlink } from 'fs/promises';
const path = require('node:path');

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

  deleteImageFromStorage(fileName: string) {
    unlink(path.join(__dirname, '../../..','u', fileName))
  }

  async deleteImage(_id: string) {
    const image = await this.localImageRepository.findOne({ _id });

    if (image) {
      this.deleteImageFromStorage(image.filename)
      return await this.localImageRepository.deleteMany({ _id });
    }

    throw new NotFoundException({ message: `Image with id:${_id} not found` });
  }

  async findAll(): Promise<LocalImageDto[]> {
    return this.localImageRepository.find({});
  }
}
