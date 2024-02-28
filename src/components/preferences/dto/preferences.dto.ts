import { Preferences } from '../schemas/preferences.schema';

export class PreferencesDto {
  _id: string;

  mainImage: string;

  aboutImage: string;

  aboutContent: string;

  description: string;

  constructor(prefs?: Preferences) {
    if (prefs) {
      this._id = prefs._id.toString();
      if (prefs.mainImage) this.mainImage = prefs.mainImage;
      if (prefs.aboutImage) this.aboutImage = prefs.aboutImage;
      if (prefs.aboutContent) this.aboutContent = prefs.aboutContent;
      if (prefs.description) this.description = prefs.description;
    }
  }
}
