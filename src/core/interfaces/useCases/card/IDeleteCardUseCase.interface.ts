import { Card } from 'src/core/entities/Card.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IDeleteCardUseCase {
  execute: (cardId: string) => Promise<CustomResponse<Card>>
}

export const IDeleteCardUseCase = Symbol('IDeleteCardUseCase')
