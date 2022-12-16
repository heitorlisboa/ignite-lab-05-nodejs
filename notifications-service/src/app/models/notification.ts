import { randomUUID } from 'node:crypto';
import { z } from 'zod';

import type { PartialKeys } from '@/shared/types/utility';

type NotificationProps = z.infer<typeof notificationPropsSchema>;

type NotificationConstructorProps = PartialKeys<
  NotificationProps,
  'readAt' | 'createdAt'
>;

const notificationPropsSchema = z.object({
  recipientId: z.string().uuid(),
  content: z.string().min(5).max(256),
  category: z.string().min(1),
  readAt: z.date().nullable(),
  createdAt: z.date(),
});

export class Notification {
  private _id: string = randomUUID();
  private props: NotificationProps;

  constructor(props: NotificationConstructorProps) {
    const propsToParse: NotificationProps = {
      ...props,
      readAt: props.readAt ?? null,
      createdAt: props.createdAt ?? new Date(),
    };
    this.props = notificationPropsSchema.parse(propsToParse);
  }

  get id() {
    return this._id;
  }
  get recipientId() {
    return this.props.recipientId;
  }
  get content() {
    return this.props.content;
  }
  get category() {
    return this.props.category;
  }
  get readAt() {
    return this.props.readAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
}
