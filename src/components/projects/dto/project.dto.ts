import { CategoryDto } from '@components/categories/dto/category.dto';

export class ProjectDto {
  _id: string;

  title: string;

  alias: string;

  previewImage?: string;

  heroImage?: string;

  description?: string;

  content?: object;

  category?: string | CategoryDto;
}
