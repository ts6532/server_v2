import { Category } from '@components/categories/category.schema';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CategoryDto extends Category {}

export class CreateCategoryDto extends OmitType(Category, ['id']) {}

export class UpdateCategoryDto extends PartialType(Category) {
  id: string;
}
