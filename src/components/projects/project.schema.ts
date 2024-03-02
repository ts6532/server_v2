import {
  Category,
  CategorySchema,
} from '@components/categories/category.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class Project extends Base {
  @Prop({ required: true })
  title: string;

  @Prop()
  previewImage: string;

  @Prop()
  heroImage: string;

  @Prop({ unique: true, required: true })
  alias: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop({ type: CategorySchema })
  @Type(() => Category)
  category: Category;
}

export type ProjectDocument = Project & Document;

export const ProjectSchema = SchemaFactory.createForClass(Project);
