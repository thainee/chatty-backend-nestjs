import { Module } from '@nestjs/common';
import { RedisService } from '@shared/services/redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class SharedModule {}
