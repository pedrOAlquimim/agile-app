import { Inject } from '@nestjs/common'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { IDeleteCardUseCase } from 'src/core/interfaces/useCases/card/IdeleteCardUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class DeleteCardUseCase implements IDeleteCardUseCase {
  constructor(
    @Inject(ICardRepository)
    private readonly cardRepository: ICardRepository,
  ) {}

  async execute(cardId: string) {
    try {
      const response = new CustomResponse<null>()

      const card = await this.cardRepository.findById(cardId)

      if (!card) return response.addError(['Card does not exist'])

      await this.cardRepository.deleteData(cardId)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
