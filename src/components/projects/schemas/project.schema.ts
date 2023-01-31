import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop()
  _id: Types.ObjectId;

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

  @Prop({ ref: 'Category' })
  category: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
