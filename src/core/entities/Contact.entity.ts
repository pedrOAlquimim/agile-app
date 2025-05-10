import { Column, CreateDateColumn, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column('varchar')
  name: string

  @Column({
    type: 'varchar',
    length: 50,
  })
  email: string

  @Column({
    type: 'varchar',
    length: 30,
  })
  phone: string

  @CreateDateColumn()
  created_at: Date

  @Column('uuid')
  userId: string
}
