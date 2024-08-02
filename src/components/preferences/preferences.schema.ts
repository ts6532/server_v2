import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsString } from 'class-validator';
import { LocalImage } from '@components/upload/local-image.schema';
import { LocalImageDto } from '@components/upload/local-image.dto';

@Schema()
export class Preferences extends Base {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: LocalImage.name,
  })
  mainImage: string | LocalImageDto;
 
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: LocalImage.name,
  })
  aboutImage: string | LocalImageDto;

  @IsString()
  @Prop()
  aboutContent: string;

  @IsString()
  @Prop()
  description: string;
}

export type PreferencesDocument = Preferences & Document;

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
