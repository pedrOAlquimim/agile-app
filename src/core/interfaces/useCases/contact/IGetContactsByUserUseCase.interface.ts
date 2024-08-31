import { ContactDTOOutput } from 'src/core/dtos/contactOutput.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IGetContactsByUserUseCase {
  execute: (userID: string) => Promise<CustomResponse<ContactDTOOutput[]>>
}

export const IGetContactsByUserUseCase = Symbol('IGetContactsByUserUseCase')
