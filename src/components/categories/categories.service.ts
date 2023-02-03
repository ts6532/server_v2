import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMessage } from '@src/types/general';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    try {
      return await this.categoryRepository.create(createCategoryDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ошибка при создании категории', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryRepository.find({});
  }

  async findOne(_id: string): Promise<CategoryDocument> {
    return this.categoryRepository.findOne({ _id });
  }

  async update(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    try {
      const { _id, ...data } = updateCategoryDto;
      return await this.categoryRepository.update({ _id }, data);
    } catch (error) {
      throw new HttpException(
        { message: 'Ошибка при удалении категории', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(_id: string): Promise<IMessage> {
    try {
      await this.categoryRepository.deleteMany({ _id });
      return { message: 'Категория успешно удалена' };
    } catch (error) {
      throw new HttpException(
        { message: 'Ошибка при удалении категории', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
