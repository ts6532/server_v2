import { CategoriesModule } from '@components/categories/categories.module';
import { PreferencesModule } from '@components/preferences/preferences.module';
import { ProjectsModule } from '@components/projects/projects.module';
import { UserModule } from '@components/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SessionModule } from '@src/common/session.module';
import { join } from 'path';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CONNECT_DB),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
    }),
    SessionModule,
    AuthModule,
    UserModule,
    PreferencesModule,
    CategoriesModule,
    ProjectsModule,
  ],
})
export class AppModule {}
