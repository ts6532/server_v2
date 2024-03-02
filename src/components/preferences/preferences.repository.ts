import { EntityRepository } from '@database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preferences, PreferencesDocument } from './preferences.schema';

export class PreferencesRepository extends EntityRepository<PreferencesDocument> {
  constructor(
    @InjectModel(Preferences.name) prefModel: Model<PreferencesDocument>,
  ) {
    super(prefModel);

    async function init() {
      const prefs = await prefModel.findOne({});

      if (!prefs) {
        const newPrefs = new prefModel({
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
