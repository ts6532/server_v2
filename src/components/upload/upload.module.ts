import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LocalImageRepository } from '@components/upload/upload.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LocalImage,
  LocalImageSchema,
} from '@components/upload/local-image.schema';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './u',
        filename: function (req, file, cb) {
          const extArray = file.mimetype.split('/');
          const extension = extArray[extArray.length - 1];
          cb(
            null,
            file.originalname.replace(/\.[^/.]+$/, '') +
              '_' +
              Date.now() +
              '.' +
              extension,
          );
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: LocalImage.name, schema: LocalImageSchema },
    ]),
  ],
  providers: [UploadService, LocalImageRepository],
  controllers: [UploadController],
  exports: [UploadService]
})
export class UploadModule {}
