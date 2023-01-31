import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filterQuery: FilterQuery<T>,
    options?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOne(filterQuery, { ...options }).lean();
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(filterQuery).lean();
  }

  async create(data: unknown): Promise<T> {
    const entity = new this.entityModel(data);
    return entity.save();
  }

  async update(
    filterQuery: FilterQuery<T>,
    data: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findByIdAndUpdate(filterQuery, data, { new: true })
      .lean();
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(filterQuery);
    return result.deletedCount >= 1;
  }
}
