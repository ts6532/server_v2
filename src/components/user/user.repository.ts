import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { EntityRepository } from '@database/entity.repository';

export class UserRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);

    // инициализация первого тестового пользователя
    async function init() {
      const users = await userModel.find({});

      if (!users) {
        const hashedPassword = await bcrypt.hash('1', 3);

        const newUser = new userModel({
          email: 'test@test.test',
          role: 'Administrator',
          password: hashedPassword,
          isActivated: true,
        });

        await newUser.save();
      }
    }

    init();
  }
}
