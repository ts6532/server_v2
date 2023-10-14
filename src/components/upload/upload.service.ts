import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import { readdir, unlink, writeFile, access } from 'fs/promises';
import * as fs from 'fs';
import { IMessage } from '@src/types/general';
import { ImageDto } from './dto/image.dto';

@Injectable()
export class UploadService {
  private readonly _filePath = path.resolve(path.resolve(), 'uploads/images');

  async alreadyExist(fileName: string) {
    try {
      await access(path.join(this._filePath, fileName));
      return true;
    } catch (error) {
      return false;
    }
  }

  async saveImage(file: Express.Multer.File): Promise<ImageDto> {
    try {
      if (!fs.existsSync(this._filePath)) {
        fs.mkdirSync(this._filePath, { recursive: true });
      }

      if (await this.alreadyExist(file.originalname)) {
        throw new HttpException(
          { message: 'Фаил с таким именем уже существует' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await writeFile(
        path.join(this._filePath, file.originalname),
        file.buffer,
      );

      return {
        url: `static/images/${file.originalname}`,
        fileName: file.originalname,
      };
    } catch (e) {
      throw new HttpException(
        { message: 'Произошла ошибка при записи файла', error: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllImages(): Promise<ImageDto[]> {
    try {
      const fileNames = await readdir(this._filePath);

      const list: ImageDto[] = [];

      for (const fileName of fileNames) {
        const image = {
          url: `static/images/${fileName}`,
          fileName: fileName,
        };
        list.push(image);
      }

      return list;
    } catch (e) {
      throw new HttpException(
        { message: 'Произошла ошибка при чтении файлов', error: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteImage(filename: string): Promise<IMessage> {
    if (!filename) {
      throw new HttpException(
        { message: 'Не указанно имя фаила для удаления' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentFiles = await readdir(this._filePath);

    if (!currentFiles.includes(filename))
      throw new HttpException(
        { message: 'Такого фаила не существует' },
        HttpStatus.BAD_REQUEST,
      );

    try {
      await unlink(path.join(this._filePath, filename));
      return { message: 'Фаил успешно удален' };
    } catch (error) {
      throw new HttpException(
        { message: 'Произошла ошибка при удалении файла', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
