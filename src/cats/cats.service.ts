import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Breed } from '../breeds/entities/breed.entity'
import { Role } from '../common/enums/rol.enum'
import { UserActiveInterface } from '../common/interfaces/ActiveUser.interface'
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

  async create (createCatDto: CreateCatDto, user: UserActiveInterface) {
    // const createdCat = this.catRepository.create(createCatDto)
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    })

    if (!breed) throw new BadRequestException('Breed not found')

    return await this.catRepository.save({
      ...createCatDto,
      breed,
      userEmail: user.email,
    })
  }

  async findAll (user: UserActiveInterface) {
    if (user.role === Role.ADMIN) return await this.catRepository.find()
    return await this.catRepository.find({
      where: { userEmail: user.email },
    })
  }

  async findOne (id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({ id })

    if (!cat) throw new BadRequestException('Cat not found')

    this.validateOwnerShip(cat, user)

    return cat
  }

  async update (
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id, user)
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed
        ? await this.validateBreed(updateCatDto.breed)
        : undefined,
      userEmail: user.email,
    })
  }

  async remove (id: number, user: UserActiveInterface) {
    await this.findOne(id, user)
    // Soft delete: set it to the current timestamp when a record is deleted and keep the records in the database.
    // Soft remove: remove the records from the database.
    return await this.catRepository.softDelete({ id })
  }
  private validateOwnerShip (cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email)
      throw new UnauthorizedException()
  }
  private async validateBreed (breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed })

    if (!breedEntity) throw new BadRequestException('Breed not found')

    return breedEntity
  }
}
