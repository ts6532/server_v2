import { CategoryDto } from '@components/categories/category.dto';
import { Project } from '@components/projects/project.schema';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ProjectDto extends Project {
  category: string;
}

export class FullProjectDto extends Project {
  category: CategoryDto;
}

export class CreateProjectDto extends OmitType(Project, ['id']) {}

export class UpdateProjectDto extends PartialType(Project) {}

export const listProjectFields = [
  'id',
  'previewImage',
  'alias',
  'category',
] as const;

export class ListProjectDto extends PickType(Project, listProjectFields) {
  category: string;
}
export class ListProjectsDto {
  total: number;
  results: ListProjectDto[];
}

export class SearchProjectDto {
  @IsOptional()
  filter?: string;

  @Type(() => Number)
  limit?: number = 5;

  @Type(() => Number)
  skip?: number = 0;
}
