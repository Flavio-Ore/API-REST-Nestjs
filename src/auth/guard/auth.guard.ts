import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private readonly jwtService: JwtService) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException()
    console.log('token :>> ', token)

    try {
      const payload = await this.jwtService.verifyAsync(token)

      // 💡 We're assigning the payload to the request object here so that we access it in our route handlers
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader (request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    console.log('type, token :>> ', { type }, { token })
    // Bearer is a standard for token authentication
    return type === 'Bearer' ? token : undefined
  }
}
