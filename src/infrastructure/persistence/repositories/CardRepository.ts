import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { BaseRepository } from './BaseRepository'
import { Card } from 'src/core/entities/Card.entity'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CardRepository
  extends BaseRepository<Card>
  implements ICardRepository
{
  constructor(dataSource: DataSource) {
    super(Card, dataSource)
  }

  async findByColumn(column: ColumnCard) {
    return await this.find({
      where: {
        column,
      },
    })
  }
}
