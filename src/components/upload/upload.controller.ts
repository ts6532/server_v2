import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  handleUpload(@UploadedFile('file') file: Express.Multer.File) {
    console.log('file', file);
    return 'File upload API';
  }
}
