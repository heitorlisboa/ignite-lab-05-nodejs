import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma.service';
import { NotificationsRepository } from '../notifications-repository';
import { Notification } from 'src/app/models/notification';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findMany(): Promise<Notification[]> {
    return (await this.prismaService.notification.findMany()).map(
      (notification) => new Notification(notification)
    );
  }
  async create(notification: Notification): Promise<void> {
    this.prismaService.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content,
        category: notification.category,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}
