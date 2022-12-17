import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { z } from 'zod';

import { SendNotification } from '@/app/use-cases/send-notification';

type SendNotificationPayload = z.infer<typeof sendNotificationPayloadSchema>;

const sendNotificationPayloadSchema = z.object({
  recipientId: z.string(),
  content: z.string(),
  category: z.string(),
});

@Controller()
export class NotificationMessagesController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() payload: SendNotificationPayload) {
    const result = sendNotificationPayloadSchema.safeParse(payload);
    if (!result.success) return;

    const { recipientId, category, content } = result.data;
    await this.sendNotification.execute({ recipientId, category, content });
  }
}
