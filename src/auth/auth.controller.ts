import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthGuard } from './guard/auth.guard'
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

  @Get('profile') @UseGuards(AuthGuard) profile (
    @Req() request: AuthGuardRequest,
  ) {
    return request.user
  }
}
