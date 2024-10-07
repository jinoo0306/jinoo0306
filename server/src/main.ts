import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Swagger 관련 import 추가
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Trip Ledger API')
    .setDescription('The Trip Ledger API Swagger Documentation')
    .setVersion('v1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui/index.html', app, document); // swagger-ui/index.html로 접속 필요

  // ValidationPipe 설정
  app.useGlobalPipes(new ValidationPipe());

  // CORS 설정
  app.enableCors();

  // 서버 실행 (포트: 8080)
  await app.listen(8080);
}
bootstrap();
