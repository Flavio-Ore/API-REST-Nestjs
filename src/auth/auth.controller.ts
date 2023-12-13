import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { Role } from './enums/rol.enum'
import { AuthGuardRequest } from './types/AuthGuardReq'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register') register (@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login') login (@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Get('profile') @Auth(Role.ADMIN) profile (@Req() request: AuthGuardRequest) {
    return this.authService.profile(request.user)
  }
}
