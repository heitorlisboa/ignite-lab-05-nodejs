import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';
import { NotificationMessagesController } from '@/controllers/notification-messages.controller';
import { KafkaConsumerService } from '@/shared/messaging/kafka-comsumer.service';
import { SendNotification } from '@/app/use-cases/send-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationMessagesController],
  providers: [KafkaConsumerService, SendNotification],
})
export class MessagingModule {}
