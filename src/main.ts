import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@src/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.use(cookieParser(process.env.SESSION_SECRET));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
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

  app.use(passport.initialize());

  app.use(passport.session());

  app.use(helmet());

  // app.use(csurf());

  // app.use((req: any, res: any, next: any) => {
  //   const token = req.csrfToken();
  //   res.cookie('XSRF-TOKEN', token);
  //   res.locals.csrfToken = token;

  //   next();
  // });

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Portfolio REST api')
        .setVersion('1.0')
        .build(),
    ),
  );

  await app.listen(process.env.PORT);
}

bootstrap().then(() => console.log(`...listen on port ${process.env.PORT}`));
