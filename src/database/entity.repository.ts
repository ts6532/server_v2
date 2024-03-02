import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(private readonly entityModel: Model<T>) {}

  async findOne(filterQuery: FilterQuery<T>, options?: QueryOptions<T>) {
    return await this.entityModel
      .findOne(
        {
          ...filterQuery,
        },
        { ...options },
      )
      .then((res) => {
        if (!res) throw new NotFoundException();
        return res;
      })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
  }

  async find(filterQuery: FilterQuery<T> = {}) {
    return await this.entityModel
      .find({
        ...filterQuery,
      })
      .then((res) => {
        if (!res?.length) throw new NotFoundException();
        return res;
      })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
  }

  async create(data: any) {
    return await this.entityModel.create(data).catch((e) => {
      throw new InternalServerErrorException(e);
    });
  }

  async update(
    filterQuery: FilterQuery<T>,
    data: UpdateQuery<unknown>,
    options?: QueryOptions<T>,
  ) {
    const result = await this.entityModel.findOneAndUpdate(
      { ...filterQuery },
      data,
      {
        new: true,
        ...options,
      },
    );

    if (!result) throw new InternalServerErrorException();

    return result;
  }

  async deleteMany(filterQuery: FilterQuery<T>) {
    const result = await this.entityModel.deleteMany({
      ...filterQuery,
    });

    if (!result) throw new InternalServerErrorException();

    return result.deletedCount >= 1;
  }
}
