import { UpdateCardDTOInput } from 'src/core/dtos/updateCardInput.dto'
import { Card } from 'src/core/entities/Card.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IUpdateCardUseCase {
  execute: (input: UpdateCardDTOInput) => Promise<CustomResponse<Card>>
}

export const IUpdateCardUseCase = Symbol('IUpdateCardUseCase')
