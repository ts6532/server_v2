import { EntityRepository } from '@database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

export class UserRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);

    // инициализация первого тестового пользователя
    async function init() {
      const users = await userModel.findOne({});

      if (!users) {
        const hashedPassword = await bcrypt.hash('1', 3);

        const newUser = new userModel({
          _id: new Types.ObjectId(),
          email: 'test@test.test',
          role: 'Administrator',
          password: hashedPassword,
        });

        await newUser.save();
      }
    }

    init();
  }
}
