import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  recipientId: string;

  @Length(5, 256)
  content: string;

  @IsNotEmpty()
  category: string;
}
