export class CreateProjectDto {
  title: string;

  alias: string;

  previewImage?: string;

  heroImage?: string;

  description?: string;

  content?: object;

  category?: string;
}
