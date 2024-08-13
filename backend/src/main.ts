import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurarea CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL-ul frontend-ului 
  });
  
  await app.listen(3001); // Portul backend-ului
}
bootstrap();
