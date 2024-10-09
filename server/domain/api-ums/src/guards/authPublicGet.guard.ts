import { JwtConfig } from '@/config';
import { NEST_COMMON, NEST_JWT } from "@core-api/nest-core";
import { Request } from 'express';

@NEST_COMMON.Injectable()
export class AuthGuard implements NEST_COMMON.CanActivate {
  constructor(private jwtService: NEST_JWT.JwtService) { }

  async canActivate(context: NEST_COMMON.ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.method === "GET") {
      return true;
    }

    const isValidated = await this.validateRequest(request);
    return isValidated;
  }

  private async validateRequest(request: any) {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new NEST_COMMON.UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: JwtConfig.JWT_SECRET
        }
      );
      request['authUser'] = payload;
      return true;
    } catch (error) {
      return false;
    }

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}