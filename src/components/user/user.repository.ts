import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

export class UserRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);

    // инициализируем первого тестового пользователя
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
