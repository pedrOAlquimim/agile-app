import { Inject } from '@nestjs/common'
import { UpdateCardDTOInput } from 'src/core/dtos/updateCardInput.dto'
import { Card } from 'src/core/entities/Card.entity'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { IUpdateCardUseCase } from 'src/core/interfaces/useCases/card/IUpdateCardUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class UpdateCardUseCase implements IUpdateCardUseCase {
  constructor(
    @Inject(ICardRepository)
    private readonly cardRepository: ICardRepository,
  ) {}

  async execute(input: UpdateCardDTOInput) {
    try {
      const response = new CustomResponse<Card>()

      const card = await this.cardRepository.findById(input.cardId)

      if (!card) return response.addError(['Card does not exist'])

      card.title = input.title
      card.description = input.description

      await this.cardRepository.updateData(card)

      response.data = card

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
