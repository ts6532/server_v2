import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  activationLink: string;

  @Prop()
  firstname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
