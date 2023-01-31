import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return new CategoryDto(
      await this.categoriesService.create(createCategoryDto),
    );
  }

  @Get()
  async findAll() {
    const res = await this.categoriesService.findAll();
    return res.map((el) => new CategoryDto(el));
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    return new CategoryDto(await this.categoriesService.findOne(_id));
  }

  @Put()
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return new CategoryDto(
      await this.categoriesService.update(updateCategoryDto),
    );
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    return this.categoriesService.remove(_id);
  }
}
