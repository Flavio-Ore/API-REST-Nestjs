// All the information about the Cat entity is defined here and it will be used by TypeORM to create a table in the database.

import { Column, DeleteDateColumn, Entity } from 'typeorm'

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

  @Column()
  breed: string

  //Soft Delete: Not actually delete the record from the database, but instead set a deletedAt column to the current timestamp.
  @DeleteDateColumn()
  deletedAt?: Date
}
