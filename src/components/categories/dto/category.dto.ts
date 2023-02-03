import { Category } from '../schemas/category.schema';

export class CategoryDto {
  _id: string;

  name: string;

  description?: string;

  constructor(data?: Category) {
    if (data) {
      this._id = data._id?.toString();
      this.name = data.name;
      if (data.description) this.description = data.description;
    }
  }
}
