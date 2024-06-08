import { UploadService } from '@components/upload/upload.service';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload/image')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  handleUpload(
    @Body() { title, alt },
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.uploadService.saveImage(file, { title, alt });
  }
}
