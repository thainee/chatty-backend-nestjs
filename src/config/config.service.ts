import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get(key: string): string {
    return this.nestConfigService.get<string>(key);
  }

  get databaseUrl(): string {
    return this.get('DATABASE_URL');
  }

  get jwtSecret(): string {
    return this.get('JWT_SECRET');
  }

  get port(): number {
    return parseInt(this.get('PORT'), 10);
  }

  get cookieSecretKeyOne(): string {
    return this.get('COOKIE_SECRET_KEY_ONE');
  }

  get cookieSecretKeyTwo(): string {
    return this.get('COOKIE_SECRET_KEY_TWO');
  }

  get tokenExpiresIn(): string {
    return this.get('TOKEN_EXPIRES_IN');
  }

  get cookieMaxAge(): number {
    return parseInt(this.get('COOKIE_MAX_AGE'), 10);
  }

  get clientUrl(): string {
    return this.get('CLIENT_URL');
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV');
  }
}
