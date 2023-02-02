import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PreferencesDocument = HydratedDocument<Preferences>;

@Schema()
export class Preferences {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  mainImage: string;

  @Prop()
  aboutImage: string;

  @Prop({ type: Object })
  aboutContent: object;

  @Prop()
  description: string;
}

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
