import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/database/prisma.service';
import { NotificationsRepository } from '../notifications-repository';
import { Notification } from '@/app/models/notification';
import { NotificationMapper } from '@/shared/mappers/notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findUnique({
      where: { id },
    });
    return raw ? new Notification(raw) : null;
  }

  async findMany(): Promise<Notification[]> {
    return (await this.prismaService.notification.findMany()).map(
      (notification) => new Notification(notification)
    );
  }
  async create(notification: Notification): Promise<void> {
    this.prismaService.notification.create({
      data: NotificationMapper.format(notification),
    });
  }

  async update(notification: Notification): Promise<void> {
    this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: NotificationMapper.format(notification),
    });
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: { recipientId },
    });
  }
}
