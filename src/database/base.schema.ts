import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema({
  toJSON: {
    versionKey: false,
    flattenObjectIds: true,
    transform: function (doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Base {
  id: string;
}

const BaseSchema = SchemaFactory.createForClass(Base);

export { BaseSchema };
