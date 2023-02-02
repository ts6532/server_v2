import { CategoryDto } from '@components/categories/dto/category.dto';
import { Project } from '../schemas/project.schema';
import { ProjectDto } from './project.dto';

export class PopulatedProjectDto extends ProjectDto {
  category?: CategoryDto;
  constructor(data?: Project) {
    super();
    this.category = new CategoryDto(data.category);
  }
}
