import { Body, Controller, Get, Post } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { CreateNotificationDto } from './create-notification-dto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    return await this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;

    await this.prisma.notification.create({
      data: { content, category, recipientId },
    });
  }
}
