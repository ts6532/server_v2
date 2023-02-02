import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EntityRepository } from '@database/entity.repository';
import { Preferences, PreferencesDocument } from './schemas/Preferences.schema';

export class PreferencesRepository extends EntityRepository<PreferencesDocument> {
  constructor(
    @InjectModel(Preferences.name) prefModel: Model<PreferencesDocument>,
  ) {
    super(prefModel);

    async function init() {
      const prefs = await prefModel.findOne({});

      if (!prefs) {
        const newPrefs = new prefModel({
          _id: new Types.ObjectId(),
          mainImage: '',
          aboutImage: '',
          aboutContent: {},
          description: '',
        });

        await newPrefs.save();
      }
    }

    init();
  }
}
