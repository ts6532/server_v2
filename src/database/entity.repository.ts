import { Document, FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filterQuery: FilterQuery<T>,
    options?: Record<string, unknown>,
  ) {
    return this.entityModel
      .findOne(
        {
          ...filterQuery,
        },
        { ...options },
      )
      .select('-__v')
      .lean();
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel
      .find({
        ...filterQuery,
      })
      .select('-__v')
      .lean();
  }

  async create(data: any) {
    const entity = new this.entityModel({
      ...data,
      _id: new Types.ObjectId(),
    });
    return await entity.save();
  }

  async update(
    filterQuery: FilterQuery<T>,
    data: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOneAndUpdate({ ...filterQuery }, data, {
        new: true,
      })
      .lean();
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany({
      ...filterQuery,
    });
    return result.deletedCount >= 1;
  }
}
