import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './entities/cat.entity'

@Injectable()
export class CatsService {
  constructor (
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async create (createCatDto: CreateCatDto) {
    // const createdCat = this.catRepository.create(createCatDto)
    return await this.catRepository.save(createCatDto)
  }

  async findAll () {
    return await this.catRepository.find()
  }

  async findOne (id: number) {
    return await this.catRepository.findOneBy({ id })
  }

  async update (id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`
  }

  async remove (id: number) {
    // Soft delete: set it to the current timestamp when a record is deleted and keep the records in the database.
    // Soft remove: remove the records from the database.
    return await this.catRepository.softDelete({ id })
  }
}
