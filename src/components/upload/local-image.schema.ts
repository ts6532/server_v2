import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LocalImage extends Base {
  @Prop()
  title?: string;

  @Prop()
  alt?: string;

  @Prop()
  filename: string;

  @Prop()
  location: string;
}

export type LocalImageDocument = LocalImage & Document;

export const LocalImageSchema = SchemaFactory.createForClass(LocalImage);
