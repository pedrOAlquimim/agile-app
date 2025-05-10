import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { IBaseRepository } from './IBaseRepository.interface'
import { Card } from 'src/core/entities/Card.entity'

export interface ICardRepository extends IBaseRepository<Card> {
  findByColumn: (column: ColumnCard) => Promise<Card[]>
}

export const ICardRepository = Symbol('ICardRepository')
