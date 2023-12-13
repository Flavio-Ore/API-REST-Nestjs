import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../enums/rol.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private reflector: Reflector) {}
  canActivate (context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!role) return true

    const { user } = context.switchToHttp().getRequest()
    console.log({ user })
    return role === user.role
  }
}
