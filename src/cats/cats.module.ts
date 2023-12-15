import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { BreedsModule } from '../breeds/breeds.module'
import { BreedsService } from '../breeds/breeds.service'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { Cat } from './entities/cat.entity'

// Using Repository Pattern
@Module({
  // The forFeature() method is used to define which repositories are registered in the current scope.
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule, AuthModule],
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
})
export class CatsModule {}
