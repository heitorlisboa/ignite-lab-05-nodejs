import { randomUUID } from 'node:crypto';
import { z } from 'zod';

import type { PartialKeys } from '@/shared/types/utility';

type NotificationProps = z.infer<typeof notificationPropsSchema>;

type NotificationConstructorProps = PartialKeys<
  NotificationProps,
  'readAt' | 'canceledAt' | 'createdAt'
> & {
  id?: string;
};

const notificationPropsSchema = z.object({
  recipientId: z.string().uuid(),
  content: z.string().min(5).max(256),
  category: z.string().min(1),
  readAt: z.date().nullable(),
  canceledAt: z.date().nullable(),
  createdAt: z.date(),
});

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor({ id, ...props }: NotificationConstructorProps) {
    this._id = id ? z.string().uuid().parse(id) : randomUUID();
    const propsToParse: NotificationProps = {
      ...props,
      readAt: props.readAt ?? null,
      canceledAt: props.canceledAt ?? null,
      createdAt: props.createdAt ?? new Date(),
    };
    this.props = notificationPropsSchema.parse(propsToParse);
  }

  public updateProps(props: Partial<NotificationProps>) {
    this.props = {
      ...this.props,
      ...notificationPropsSchema.partial().parse(props),
    };
  }

  public markAsRead() {
    this.props.readAt = new Date();
  }

  public markAsUnread() {
    this.props.readAt = null;
  }

  public cancel() {
    this.props.canceledAt = new Date();
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
  get canceledAt() {
    return this.props.canceledAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
}
