import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { PrismaNotificationsRepository } from 'src/app/repositories/prisma/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
