import { Inject } from '@nestjs/common'
import { Card } from 'src/core/entities/Card.entity'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { IDeleteCardUseCase } from 'src/core/interfaces/useCases/card/IDeleteCardUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class DeleteCardUseCase implements IDeleteCardUseCase {
  constructor(
    @Inject(ICardRepository)
    private readonly cardRepository: ICardRepository,
  ) {}

  async execute(cardId: string) {
    try {
      const response = new CustomResponse<Card>()

      const card = await this.cardRepository.findById(cardId)

      if (!card) return response.addError(['Card does not exist'])

      await this.cardRepository.deleteData(cardId)
      response.data = card

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
