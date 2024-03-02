import { CategoryDto } from '@components/categories/category.dto';
import { Category } from '@components/categories/category.schema';
import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Base {
  @Prop({ required: true })
  title: string;

  @Prop()
  previewImage?: string;

  @Prop()
  heroImage?: string;

  @Prop({ unique: true, required: true })
  alias: string;

  @Prop()
  description?: string;

  @IsString()
  @Prop()
  content?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
  })
  category: string | CategoryDto;
}

export type ProjectDocument = Project & Document;

export const ProjectSchema = SchemaFactory.createForClass(Project);
