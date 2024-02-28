import { SessionAuthGuard } from '@components/auth/session-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { UploadService } from './upload.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(SessionAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('upload'))
  async uploadFile(@UploadedFile() upload: Express.Multer.File) {
    return this.uploadService.saveImage(upload);
  }

  @UseGuards(SessionAuthGuard)
  @Get('images')
  async getImages() {
    return this.uploadService.getAllImages();
  }

  @UseGuards(SessionAuthGuard)
  @Delete()
  async deleteImage(@Query('name') name: string) {
    return this.uploadService.deleteImage(name);
  }
}
