import { Project } from './Project.entity'
import { Card } from './Card.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('columns')
export class ColumnCard {
  @PrimaryGeneratedColumn('increment')
  id: number

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

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[]

  @ManyToOne(() => Project, (project) => project.column)
  project: Project
}
