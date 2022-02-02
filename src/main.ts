import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const port = 3000;
  await app.listen(port);
  logger.log(`Server is running in http://localhost:${port}`);
}
bootstrap();
// min 41.58
