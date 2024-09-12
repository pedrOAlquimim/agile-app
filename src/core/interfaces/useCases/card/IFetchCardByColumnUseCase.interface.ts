import { Card } from 'src/core/entities/Card.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IFetchCardByColumnUseCase {
  execute: (columnId: string) => Promise<CustomResponse<Card[]>>
}

export const IFetchCardByColumnUseCase = Symbol('IFetchCardByColumnUseCase')
