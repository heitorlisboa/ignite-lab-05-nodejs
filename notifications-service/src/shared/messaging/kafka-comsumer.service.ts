import { ServerKafka } from '@nestjs/microservices';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { env } from '../utils/env';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: [env.getOrThrow('KAFKA_BROKER_URL')],
        sasl: {
          mechanism: 'scram-sha-256',
          username: env.getOrThrow('KAFKA_USERNAME'),
          password: env.getOrThrow('KAFKA_PASSWORD'),
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
