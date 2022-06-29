import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Woodlify API')
    .setDescription('Woodlify API endpoints implementation')
    .setVersion('1.0')
    .addTag('wood')
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true
    }
  });
  await app.listen(8080);
}
bootstrap();
