import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.create(createCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Ошибка при создании категории',
      );
    }
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryRepository.find({});
  }

  async findOne(_id: string) {
    return this.categoryRepository.findOne({ _id });
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    try {
      const { _id, ...data } = updateCategoryDto;
      return await this.categoryRepository.update({ _id }, data);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Ошибка при обновлении категории',
      );
    }
  }

  async remove(_id: string) {
    try {
      await this.categoryRepository.deleteMany({ _id });
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Ошибка при удалении категории',
      );
    }
  }
}
