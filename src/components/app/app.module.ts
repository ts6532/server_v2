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
import { UploadModule } from '@components/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(resolve(), 'uploads'),
      serveRoot: '/',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    SessionModule,
    MongooseModule.forRoot(process.env.CONNECT_DB),
    UserModule,
    AuthModule,
    CategoriesModule,
    ProjectsModule,
    PreferencesModule,
    MulterModule.register({
      dest: './uploads/images',
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
