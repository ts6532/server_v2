import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async saveImage(file: Express.Multer.File, imageData) {
    console.log(file, imageData);
  }
}
