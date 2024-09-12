import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { BaseRepository } from './BaseRepository'
import { Card } from 'src/core/entities/Card.entity'

export class CardRepository
  extends BaseRepository<Card>
  implements ICardRepository
{
  constructor() {
    super(Card)
  }
}
