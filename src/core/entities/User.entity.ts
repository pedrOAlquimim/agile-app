import { Column, CreateDateColumn, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity('users')
export class User extends BaseEntity {
  @Column('varchar')
  email: string

  @Column('varchar')
  firstName: string

  @Column('varchar')
  lastName: string

  @Column('varchar')
  password: string

  @CreateDateColumn()
  created_at: Date
}
