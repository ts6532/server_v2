import { Project } from '@components/projects/project.schema';
import { OmitType, PartialType } from '@nestjs/swagger';

export class ProjectDto extends Project {}

export class CreateProjectDto extends OmitType(Project, ['id']) {}

export class UpdateProjectDto extends PartialType(Project) {}

export class ListProjectDto {
  total: number;
  projects: ProjectDto[];
}

export class SearchProjectDto {
  filter?: string;
  limit: number;
  skip: number;
}
