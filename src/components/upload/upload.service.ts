import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import { mkdir, readdir, unlink, writeFile } from 'fs/promises';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { IMessage } from '@src/types/general';

@Injectable()
export class UploadService {
  private readonly _filePath = path.resolve(path.resolve(), 'uploads/images');

  async saveImage(file): Promise<string> {
    try {
      if (!fs.existsSync(this._filePath)) {
        fs.mkdirSync(this._filePath, { recursive: true });
      }

      const fileName = uuid.v4() + '.png';

      await writeFile(path.join(this._filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(
        { message: 'Произошла ошибка при записи файла', error: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllImages(): Promise<string[]> {
    try {
      const fileNames = await readdir(this._filePath);

      const list = [];

      for (const file of fileNames) {
        const image = {
          url: `/api/images/${file}`,
          name: file,
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
    try {
      if (!filename)
        throw new HttpException(
          { message: 'Не указанно имя фаила для удаления' },
          HttpStatus.BAD_REQUEST,
        );

      const currentFiles = await readdir(this._filePath);

      if (!currentFiles.includes(filename))
        throw new HttpException(
          { message: 'Такого фаила не существует' },
          HttpStatus.BAD_REQUEST,
        );

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
