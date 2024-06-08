import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT;
  const swagger = new DocumentBuilder()
    .setTitle('News')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter your JWT token',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .build();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors();
  app.useStaticAssets('public');
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'custom site title',
  });

  await app.listen(PORT).catch((err) => console.log(err));
}
bootstrap();
