import { ExecutionContext, createParamDecorator } from '@nestjs/common'

// Always a user have a role
export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
