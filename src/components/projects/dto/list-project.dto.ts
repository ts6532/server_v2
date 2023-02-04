import { ProjectDto } from '@components/projects/dto/project.dto';
import { Project } from '../schemas/project.schema';

export class ListProjectDto {
  total: number;

  projects: ProjectDto[];

  constructor(data?: { total: number; projects: Project[] }) {
    if (data) {
      this.total = data.total;
      if (Array.isArray(data.projects))
        this.projects = data.projects.map((el) => new ProjectDto(el));
    }
  }
}
