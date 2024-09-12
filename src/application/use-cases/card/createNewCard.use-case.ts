import { Inject } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateNewCardDTOInput } from 'src/core/dtos/createNewCardInput.interface'
import { Card } from 'src/core/entities/Card.entity'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { ICreateNewCardUseCase } from 'src/core/interfaces/useCases/card/ICreateNewCardUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class CreateCardUseCase implements ICreateNewCardUseCase {
  constructor(
    @Inject(ICardRepository)
    private readonly cardRepository: ICardRepository,

    @Inject(IColumnRepository)
    private readonly columnRepository: IColumnRepository,
  ) {}

  async execute(input: CreateNewCardDTOInput) {
    try {
      const response = new CustomResponse<Card>()

      const column = await this.columnRepository.findById(input.columnId)

      if (!column) return response.addError(['Column does not exist'])

      const newCard: Card = {
        id: randomUUID(),
        created_at: new Date(),
        title: input.title,
        description: input.description,
        column,
      }

      await this.cardRepository.add(newCard)

      response.data = newCard

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
