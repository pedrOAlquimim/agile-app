import { CustomResponse } from 'src/core/response/customResponse'

export interface IDeleteContactUseCase {
  execute: (contactId: string) => Promise<CustomResponse<null>>
}

export const IDeleteContactUseCase = Symbol('IDeleteContactUseCase')
