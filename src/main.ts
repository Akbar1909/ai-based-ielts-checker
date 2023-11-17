import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './global-filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Client management')
    .setDescription(`### The client-management API description`)
    .setVersion('1.0')
    .addTag('client-management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const LOCAL_URL = 'http://localhost:3001';
  const DEV_URL = 'http://93.115.18.106:3000';
  app.enableCors({
    origin: DEV_URL,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
