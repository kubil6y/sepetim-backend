import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrimInputType } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new TrimInputType());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
