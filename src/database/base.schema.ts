import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Base {
  id: string;
}

const BaseSchema = SchemaFactory.createForClass(Base);

BaseSchema.virtual('id').get(function (this: BaseDocument) {
  return this._id;
});

export { BaseSchema };
