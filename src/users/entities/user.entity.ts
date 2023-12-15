import { Column, DeleteDateColumn, Entity } from 'typeorm'
import { Role } from '../../common/enums/rol.enum'

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number

  @Column()
  name: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: string

  @DeleteDateColumn()
  deletedAt?: Date
}
