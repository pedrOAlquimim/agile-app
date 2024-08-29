import { Column, CreateDateColumn, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Board extends BaseEntity {
  @Column('varchar')
  title: string

  @CreateDateColumn()
  created_at: Date
}
