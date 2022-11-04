import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('API DESCRIPTION')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('items')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  app.useStaticAssets(join(__dirname, "assets/swagger-ui-dist/"), {
      prefix: "/swagger"
    });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
