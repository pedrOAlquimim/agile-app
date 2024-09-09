import { ColumnCard } from './ColumnCard.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({
    type: 'varchar',
    length: 30,
  })
  title: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => ColumnCard, (column) => column.id)
  column: ColumnCard
}
