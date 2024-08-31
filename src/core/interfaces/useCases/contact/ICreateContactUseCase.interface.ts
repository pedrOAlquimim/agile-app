import { ContactDTOOutput } from 'src/core/dtos/contactOutput.dto'
import { CreateContactDTOInput } from 'src/core/dtos/createContactInput.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateContactUseCase {
  execute: (
    input: CreateContactDTOInput,
  ) => Promise<CustomResponse<ContactDTOOutput>>
}

export const ICreateContactUseCase = Symbol('ICreateContactUseCase')
