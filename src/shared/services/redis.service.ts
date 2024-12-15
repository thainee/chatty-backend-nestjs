import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {}

  get redisClient(): Redis {
    return this.client;
  }

  onModuleInit() {
    this.client = new Redis();
    this.client.on('connect', () => {
      this.logger.log(`Redis connected to ${this.client.options.port}`);
    });

    this.client.on('error', (error) => {
      this.logger.error('Redis connection error', error.message);
    });
  }

  onModuleDestroy() {
    this.client.disconnect();
    this.logger.log('Redis connection closed');
  }
}
