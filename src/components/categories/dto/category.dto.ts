import { Category } from '../schemas/category.schema';

export class CategoryDto {
  _id: string;

  name: string;

  description?: string;

  constructor(user?: Category) {
    if (user) {
      this._id = user._id.toString();
      this.name = user.name;
      if (user.description) this.description = user.description;
    }
  }
}
