// All the information about the Cat entity is defined here and it will be used by TypeORM to create a table in the database.

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Breed } from '../../breeds/entities/breed.entity'
import { User } from '../../users/entities/user.entity'

// Using Repository Pattern
@Entity()
export class Cat {
  //@PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true })
  id: number

  @Column()
  name: string

  @Column()
  age: number

  //Soft Delete: Not actually delete the record from the database, but instead set a deletedAt column to the current timestamp.
  @DeleteDateColumn()
  deletedAt?: Date

  @ManyToOne(() => Breed, breed => breed.id, {
    eager: true, // This will load the Breed entity whenever we load the Cat entity. E.g. when we call the findOne() method.
  })
  breed: Breed

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User

  @Column()
  userEmail: string
}
