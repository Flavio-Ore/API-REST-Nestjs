import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create (
    createUserDto: CreateUserDto,
  ): ReturnType<Repository<User>['save']> {
    return await this.userRepository.save(createUserDto)
  }

  findAll () {
    return 'finAll was called!'
  }

  findOne (id: number) {
    return `This action returns a #${id} user`
  }

  async findByEmail (email: string): ReturnType<Repository<User>['findOneBy']> {
    return await this.userRepository.findOneBy({
      email,
    })
  }

  async findByEmailWithPassword (
    email: string,
  ): ReturnType<Repository<User>['findOne']> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    })
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove (id: number) {
    return `This action removes a #${id} user`
  }
}
