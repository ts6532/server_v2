import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@components/categories/category.dto';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { FilterQuery } from 'mongoose';
import { Category } from '@components/categories/category.schema';
import { QueryOptions } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async findAll(): Promise<CategoryDto[]> {
    return this.categoryRepository.find({});
  }

  async findOneById(_id: string): Promise<CategoryDto> {
    return this.findOne({ _id });
  }

  async findOne(
    filterQuery: FilterQuery<Category>,
    options?: QueryOptions<Category>,
  ) {
    return await this.categoryRepository.findOne(filterQuery, options);
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    const { id, ...data } = updateCategoryDto;
    return await this.categoryRepository.update({ _id: id }, data);
  }

  async remove(id: string): Promise<boolean> {
    return await this.categoryRepository.deleteMany({ _id: id });
  }
}
