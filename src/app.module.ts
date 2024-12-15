import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigModule, DatabaseModule, SharedModule],
})
export class AppModule {}
