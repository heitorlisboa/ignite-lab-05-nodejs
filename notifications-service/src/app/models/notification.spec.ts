import { randomUUID } from 'node:crypto';
import { ZodError } from 'zod';

import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    expect(() => {
      new Notification({
        recipientId: randomUUID(),
        content: 'Conteúdo',
        category: 'Category',
      });
    }).not.toThrow();
  });

  it('should not be able to create a notification with content with less than 5 characters', () => {
    const action = () => {
      new Notification({
        recipientId: randomUUID(),
        content: '',
        category: 'Category',
      });
    };

    expect(action).toThrow(ZodError);
    expect(action).toThrow(/least*.5.*char/i);
  });

  it('should not be able to create a notification with content with more than 256 characters', () => {
    const action = () => {
      new Notification({
        recipientId: randomUUID(),
        content: 'a'.repeat(257),
        category: 'Category',
      });
    };

    expect(action).toThrow(ZodError);
    expect(action).toThrow(/most*.256.*char/i);
  });
});
