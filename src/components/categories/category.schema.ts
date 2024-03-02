import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Document } from 'mongoose';

@Schema()
export class Category extends Base {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
