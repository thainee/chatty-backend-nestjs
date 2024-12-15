import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = app.get(ConfigService);

  const PORT = configService.port || 5000;

  await app.listen(PORT);
  logger.log(`Server started on port ${PORT}`);
}
bootstrap();
