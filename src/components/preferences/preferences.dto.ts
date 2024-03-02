import { Preferences } from '@components/preferences/preferences.schema';
import { PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PreferencesDto extends Preferences {}
export class UpdatePreferencesDto extends PartialType(Preferences) {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
