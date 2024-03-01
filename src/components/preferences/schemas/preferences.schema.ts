import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PreferencesDocument = Preferences & Document;

@Schema()
export class Preferences {
  @Prop()
  mainImage: string;

  @Prop()
  aboutImage: string;

  @Prop()
  aboutContent: string;

  @Prop()
  description: string;
}

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
