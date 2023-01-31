import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryRepository.find({});
  }

  async findOne(_id: string) {
    return this.categoryRepository.findOne({ _id });
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const { _id, ...data } = updateCategoryDto;
    return this.categoryRepository.update({ _id }, data);
  }

  async remove(_id: string) {
    return this.categoryRepository.deleteMany({ _id });
  }
}
