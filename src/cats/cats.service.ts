import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Breed } from 'src/breeds/entities/breed.entity'
import { Repository } from 'typeorm'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './entities/cat.entity'

@Injectable()
export class CatsService {
  constructor (
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create (createCatDto: CreateCatDto) {
    // const createdCat = this.catRepository.create(createCatDto)
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    })

    if (!breed) throw new BadRequestException('Breed not found')

    return await this.catRepository.save({
      ...createCatDto,
      breed,
    })
  }

  async findAll () {
    return await this.catRepository.find()
  }

  async findOne (id: number) {
    return await this.catRepository.findOneBy({ id })
  }

  async update (id: number, updateCatDto: UpdateCatDto) {
    // return await this.catRepository.update(id, updateCatDto)
    return `This action updates a #${id} cat`
  }

  async remove (id: number) {
    // Soft delete: set it to the current timestamp when a record is deleted and keep the records in the database.
    // Soft remove: remove the records from the database.
    return await this.catRepository.softDelete({ id })
  }
}
