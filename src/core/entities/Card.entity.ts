import { BaseEntity } from './BaseEntity'
import { ColumnCard } from './ColumnCard.entity'
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm'

@Entity('cards')
export class Card extends BaseEntity {
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
