import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@components/user/user.module';
import { AuthModule } from '@components/auth/auth.module';
import { CategoriesModule } from '@components/categories/categories.module';
import { ProjectsModule } from '@components/projects/projects.module';
import { PreferencesModule } from '@components/preferences/preferences.module';
import { SessionModule } from '@src/common/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SessionModule,
    MongooseModule.forRoot(process.env.CONNECT_DB),
    UserModule,
    AuthModule,
    CategoriesModule,
    ProjectsModule,
    PreferencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
