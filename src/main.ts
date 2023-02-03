import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@components/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.use(cookieParser(process.env.COOKIE_SALT));

  app.use(helmet());

  app.use(
    session({
      secret: process.env.SESSION_SALT,
      saveUninitialized: false,
      cookie: {
        secure: 'auto',
        maxAge: 604800000,
        httpOnly: true,
        signed: true,
      },
      store: app.get('SESSION_STORE'),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Portfolio REST api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT);
}

bootstrap().then(() => console.log(`...listen on port ${process.env.PORT}`));
