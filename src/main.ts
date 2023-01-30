import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { AppModule } from './components/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

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

  await app.listen(process.env.PORT);

  console.log(`...listen on port ${process.env.PORT}`);
}
bootstrap();
