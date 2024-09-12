import { CustomResponse } from 'src/core/response/customResponse'

export interface IDeleteColumnUseCase {
  execute: (columnId: string) => Promise<CustomResponse<null>>
}

export const IDeleteColumnUseCase = Symbol('IDeleteColumnUseCase')
