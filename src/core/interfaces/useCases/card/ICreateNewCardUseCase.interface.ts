import { CreateNewCardDTOInput } from 'src/core/dtos/createNewCardInput.interface'
import { Card } from 'src/core/entities/Card.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateNewCardUseCase {
  execute: (input: CreateNewCardDTOInput) => Promise<CustomResponse<Card>>
}

export const ICreateNewCardUseCase = Symbol('ICreateNewCardUseCase')
