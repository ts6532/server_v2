import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstname: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
