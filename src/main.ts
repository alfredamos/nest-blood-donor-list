import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import dotenv from 'dotenv';
//import { JwtAuthGuard } from './guards/jwt-auth.guard';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(['http://localhost:4200', 'http://localhost:5173']);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap().then(() =>
  console.log(`App is running on port ${process.env.PORT}`),
);
