import * as mongoose from 'mongoose';
import { TypeMetadataStorage } from '@nestjs/mongoose/dist/storages/type-metadata.storage';
import * as _ from 'lodash';

export type SchemaOptions = mongoose.SchemaOptions & {
  inheritOption?: boolean;
};

function mergeOptions(
  parentOptions: SchemaOptions,
  childOptions: SchemaOptions,
) {
  for (const key in childOptions) {
    if (Object.prototype.hasOwnProperty.call(childOptions, key)) {
      parentOptions[key] = childOptions[key];
    }
  }
  return parentOptions;
}

export function Schema(options?: SchemaOptions): ClassDecorator {
  return (target: Function) => {
    const isInheritOptions = options?.inheritOption ?? true;

    if (isInheritOptions) {
      let parentOptions = TypeMetadataStorage.getSchemaMetadataByTarget(
        (target as any).__proto__,
      ).options;
      parentOptions = _.cloneDeep(parentOptions);
      options = mergeOptions(parentOptions, options);
    }

    TypeMetadataStorage.addSchemaMetadata({
      target,
      options,
    });
  };
}
