import { Inject } from '@nestjs/common'
import { ChangeCardFromColumnDTOInput } from 'src/core/dtos/changeCardFromColumnInput.dto'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { IChangeCardFromColumnUseCase } from 'src/core/interfaces/useCases/card/IChangeCardFromColumnUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class ChangeCardFromColumnUseCase
  implements IChangeCardFromColumnUseCase
{
  constructor(
    @Inject(ICardRepository)
    private readonly cardRepository: ICardRepository,
  ) {}

  async execute(input: ChangeCardFromColumnDTOInput) {
    try {
      const response = new CustomResponse<ColumnCard>()

      const card = input.card
      card.column = input.column

      await this.cardRepository.updateData(card)

      response.data = input.column

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
