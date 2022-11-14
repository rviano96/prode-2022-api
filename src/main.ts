import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT') || 3000;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('API PRODE')
    .setVersion('2.1.9')
    .addTag('auth')
    .addTag('match')
    .addTag('prediction')
    .addTag('stadium')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger', app, document);
  app.useStaticAssets(join(__dirname, "assets/swagger-ui-dist/"), {
    prefix: "/swagger"
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port, () => {
    console.log('[WEB]', `http://localhost:${port}`);
  });
}
bootstrap();
