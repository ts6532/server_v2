import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
