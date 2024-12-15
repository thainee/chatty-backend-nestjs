import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger(DatabaseModule.name);

        return {
          uri: configService.databaseUrl,
          onConnectionCreate(connection) {
            connection.on('connected', () =>
              logger.log('MongoDB connected successfully'),
            );
            connection.on('error', (error) => {
              logger.error('MongoDB connection error:', error.message);
            });
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
