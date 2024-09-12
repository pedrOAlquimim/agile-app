import { CustomResponse } from 'src/core/response/customResponse'

export interface IDeleteCardUseCase {
  execute: (cardId: string) => Promise<CustomResponse<null>>
}

export const IDeleteCardUseCase = Symbol('IDeleteCardUseCase')
