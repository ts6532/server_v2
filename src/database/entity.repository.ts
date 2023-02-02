import { Document, FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  createObjectId(filterQuery: FilterQuery<T>) {
    if (filterQuery['_id']) {
      const { _id, ...query } = filterQuery;
      return { _id: new Types.ObjectId(_id), ...query };
    } else {
      return filterQuery;
    }
  }

  async findOne(
    filterQuery: FilterQuery<T>,
    options?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOne(
      {
        ...this.createObjectId(filterQuery),
      },
      { ...options },
    );
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[] | null> {
    return await this.entityModel.find({
      ...this.createObjectId(filterQuery),
    });
  }

  async create(data: any): Promise<T> {
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
    return await this.entityModel.findOneAndUpdate(
      { ...this.createObjectId(filterQuery) },
      data,
      {
        new: true,
      },
    );
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany({
      ...this.createObjectId(filterQuery),
    });
    return result.deletedCount >= 1;
  }
}
