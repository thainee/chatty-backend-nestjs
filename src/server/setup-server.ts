import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { ConfigService } from '@config/config.service';
import { Request } from 'express';

export function setupServer(
  app: INestApplication,
  configService: ConfigService,
) {
  // Security middleware
  app.enableCors({
    origin: configService.clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(hpp());
  app.use(helmet());
  app.use(
    cookieSession({
      name: 'session',
      keys: [
        configService.cookieSecretKeyOne,
        configService.cookieSecretKeyTwo,
      ],
      maxAge: configService.cookieMaxAge,
      secure: configService.nodeEnv !== 'development',
    }),
  );

  // Standard middleware
  app.use(compression());
  if (configService.nodeEnv === 'development') {
    app.use(
      morgan('dev', {
        skip: (req: Request) => {
          const skipPaths = ['/queues'];
          return skipPaths.some((path) => req.originalUrl.startsWith(path));
        },
      }),
    );
  }
}
