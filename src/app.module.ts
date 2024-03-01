import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { SessionModule } from '@src/common/session.module';
import { PreferencesModule } from '@components/preferences/preferences.module';
import { CategoriesModule } from '@components/categories/categories.module';
import { ProjectsModule } from '@components/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CONNECT_DB),
    SessionModule,
    AuthModule,
    UserModule,
    PreferencesModule,
    CategoriesModule,
    ProjectsModule,
  ],
})
export class AppModule {}
