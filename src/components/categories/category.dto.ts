import { Category } from '@components/categories/category.schema';
import { OmitType, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto extends Category {}

export class CreateCategoryDto extends OmitType(Category, ['id']) {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateCategoryDto extends PartialType(Category) {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
