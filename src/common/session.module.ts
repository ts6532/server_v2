import { Module } from '@nestjs/common';
import * as MongoStore from 'connect-mongodb-session';
import * as session from 'express-session';

@Module({
  providers: [
    {
      provide: 'SESSION_STORE',
      useFactory: () => {
        const store = MongoStore(session);

        return new store({
          uri: process.env.CONNECT_DB,
          collection: 'sessions',
        });
      },
    },
  ],
  exports: ['SESSION_STORE'],
})
export class SessionModule {}
