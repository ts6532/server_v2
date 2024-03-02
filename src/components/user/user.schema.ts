import { UserRoles } from './UserRoles';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '@database/base.schema';
import { Schema } from '@database/schema.decorator';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class User extends Base {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: UserRoles[];

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop()
  firstname?: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
