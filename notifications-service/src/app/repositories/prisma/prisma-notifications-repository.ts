import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/database/prisma.service';
import { NotificationsRepository } from '../notifications-repository';
import { Notification } from '@/app/models/notification';
import { NotificationMapper } from '@/shared/mappers/notification-mapper';

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
      data: NotificationMapper.format(notification),
    });
  }
}
