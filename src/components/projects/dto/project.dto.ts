import { CategoryDto } from '@components/categories/dto/category.dto';
import { Project } from '../schemas/project.schema';

export class ProjectDto {
  _id: string;

  title: string;

  alias: string;

  previewImage?: string;

  heroImage?: string;

  description?: string;

  content?: object;

  category?: string | CategoryDto;

  constructor(project?: Project) {
    if (project) {
      this._id = project._id?.toString();
      this.title = project.title;
      this.alias = project.alias;
      if (project.category) this.category = project.category.toString();
      if (project.previewImage) this.previewImage = project.previewImage;
      if (project.description) this.description = project.description;
      if (project.content) this.content = project.content;
      if (project.heroImage) this.heroImage = project.heroImage;
    }
  }
}
