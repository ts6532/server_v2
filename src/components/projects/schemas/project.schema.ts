import { Category } from '@components/categories/schemas/category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
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

  @Prop({ type: Object })
  content: object;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
