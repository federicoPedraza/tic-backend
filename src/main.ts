import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Session } from './domain/entities';
import { TypeormStore } from 'connect-typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const ttl = 86400; // 1 day sessions
  const repository = app.get(getRepositoryToken(Session));

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET', 'secret'),
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        ttl,
      }).connect(repository),
      cookie: {
        secure: configService.get<string>('NODE_ENV') === 'prod',
        httpOnly: true,
        maxAge: ttl * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('NODE_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
