import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Document } from 'mongoose';
import { IsString } from 'class-validator';

@Schema()
export class Preferences extends Base {
  @IsString()
  @Prop()
  mainImage: string;

  @IsString()
  @Prop()
  aboutImage: string;

  @IsString()
  @Prop()
  aboutContent: string;

  @IsString()
  @Prop()
  description: string;
}

export type PreferencesDocument = Preferences & Document;

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
