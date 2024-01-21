import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    try {
      const token = this.extractToken(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      const decoded = await this.jwt.verifyAsync(token, {
        secret: this.config.get('ACCESS_TOKEN_SECRET'),
      });

      request.user = decoded;

      return true;
    } catch (e) {
      if (e.message === 'jwt expired') {
        throw new UnauthorizedException('Token expired');
      }
      return false;
    }
  }

  private extractToken(request: any) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
