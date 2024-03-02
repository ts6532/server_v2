import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Document } from 'mongoose';

@Schema()
export class Preferences extends Base {
  @Prop()
  mainImage: string;

  @Prop()
  aboutImage: string;

  @Prop()
  aboutContent: string;

  @Prop()
  description: string;
}

export type PreferencesDocument = Preferences & Document;

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
