import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all.ecxeptions.filters';
import { config } from "dotenv";

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
