import { Inject } from '@nestjs/common'
import { Card } from 'src/core/entities/Card.entity'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { IFetchCardByColumnUseCase } from 'src/core/interfaces/useCases/card/IFetchCardByColumnUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class FetchCardByColumnUseCase implements IFetchCardByColumnUseCase {
  constructor(
    @Inject(ICardRepository)
    private readonly cardRepository: ICardRepository,

    @Inject(IColumnRepository)
    private readonly columnRepository: IColumnRepository,
  ) {}

  async execute(columnId: string) {
    try {
      const response = new CustomResponse<Card[]>()

      const column = await this.columnRepository.findById(columnId)

      if (!column) return response.addError(['Column does not exist'])

      const cards = await this.cardRepository.findByColumn(column)

      response.data = cards

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
