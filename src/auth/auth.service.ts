import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from 'bcryptjs'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register ({ email, name, password }: RegisterDto) {
    const user = await this.userService.findByEmail(email)

    if (user) throw new BadRequestException('User already exists')

    return await this.userService.create({
      email,
      name,
      password: await bcryptjs.hash(password, 10),
    })
  }

  async login ({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials')

    // Who owns this token? (sub = subject)
    const payload = { sub: user.email }

    const token = await this.jwtService.signAsync(payload)

    return {
      token,
      email,
    }
  }
}
