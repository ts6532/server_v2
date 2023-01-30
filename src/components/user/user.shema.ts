import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  role: number;

  @Prop()
  password: string;

  @Prop()
  isActivated: boolean;

  @Prop()
  activationLink: string;

  @Prop()
  firstname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
