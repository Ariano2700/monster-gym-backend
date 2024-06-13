import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Monster Gym API Rest in nestJs')
    .setDescription('API Rest for data management of the Monster Gym website')
    .setVersion('1.0')
    .addTag('MonsterGym')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation/73bd00607212f3b6f2cec31b432a3efc686351790267871749496253e4a2536c', app, document);

  app.enableCors();

  await app.listen(3030);
}
bootstrap();
