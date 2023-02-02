import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesService } from './preferences.service';
import { PreferencesRepository } from './preferences.repository';
import { Preferences, PreferencesSchema } from './schemas/preferences.schema';
import { PreferencesController } from './preferences.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Preferences.name, schema: PreferencesSchema },
    ]),
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService, PreferencesRepository],
})
export class PreferencesModule {}
