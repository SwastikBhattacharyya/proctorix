import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { parse } from 'qs';
import { AppModule } from './app.module';
import { AppConfiguration } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      routerOptions: {
        querystringParser: (str) => parse(str),
      },
    }),
  );

  const appConfiguration = app.get(AppConfiguration);

  app.enableVersioning();
  app.setGlobalPrefix('api');
  app.listen(appConfiguration.port);
}

bootstrap();
