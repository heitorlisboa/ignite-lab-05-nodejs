import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import type { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './modules/app.module';
import { KafkaConsumerService } from './shared/messaging/kafka-comsumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const kafkaConsumerService = app.get(KafkaConsumerService);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });

  dotenv.config();
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
