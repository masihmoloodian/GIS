import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('GIS')
    .setDescription('The GIS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  const config = app.get(ConfigService)

  await app
    .listen(config.get<number>('app.port'), config.get('app.host'))
    .then(() =>
      console.info(
        `Server is running on http://${config.get<string>('app.host')}:${config.get<number>('app.port')}`,
        `\nSwagger is running on http://${config.get<string>('app.host')}:${config.get<number>('app.port')}/docs`
      )
    )
}
bootstrap();
