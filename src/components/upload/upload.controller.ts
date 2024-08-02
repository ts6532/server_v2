import { AuthenticatedGuard } from '@components/auth/authenticated.guard';
import { UploadService } from '@components/upload/upload.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ParamsWithId } from '@src/common/mongoId.validator';
@ApiTags('upload')
@Controller('upload/image')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

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

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async remove(@Param() { id }: ParamsWithId) {
    return this.uploadService.deleteImage(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('')
  async findAll() {
    return this.uploadService.findAll();
  }
}
