import { UserRole } from '@components/user/dto/user-roles.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: UserRole;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
