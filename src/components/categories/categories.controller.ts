import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamsWithId } from '@src/common/mongoId.validator';
import { CategoriesService } from './categories.service';
import MongooseClassSerializerInterceptor from '@database/mongooseClassSerializer.interceptor';
import { Category } from '@components/categories/category.schema';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@components/categories/category.dto';

@ApiTags('categories')
@Controller('categories')
@UseInterceptors(MongooseClassSerializerInterceptor(Category))
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: ParamsWithId) {
    return await this.categoriesService.findOneById(id);
  }

  @Patch()
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param() { id }: ParamsWithId) {
    return this.categoriesService.remove(id);
  }
}
