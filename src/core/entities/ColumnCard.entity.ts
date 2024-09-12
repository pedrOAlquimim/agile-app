import { Project } from './Project.entity'
import { Card } from './Card.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity('columns')
export class ColumnCard extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 30,
  })
  title: string

  @OneToOne(() => ColumnCard, (column) => column.id)
  previusColumnId: string

  @OneToOne(() => ColumnCard, (column) => column.id)
  nextColumnId: string

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Card, (card) => card.column, {
    onDelete: 'CASCADE',
  })
  cards: Card[]

  @ManyToOne(() => Project, (project) => project.column)
  project: Project
}
