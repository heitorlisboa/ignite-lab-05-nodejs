import { Module } from '@nestjs/common';

import { HttpModule } from './http.module';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
