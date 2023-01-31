import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from '@components/common/session.module';
import { UserModule } from '@components/user/user.module';
import { AuthModule } from '@components/auth/auth.module';
import { CategoriesModule } from '@components/categories/categories.module';
import { ProjectsModule } from '@components/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SessionModule,
    MongooseModule.forRoot(process.env.CONNECT_DB),
    UserModule,
    AuthModule,
    CategoriesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
