import { ContactDTOOutput } from 'src/core/dtos/contactOutput.dto'
import { UpdateContactDTOInput } from 'src/core/dtos/updateContact.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IUpdateContactUseCase {
  execute: (
    conatctId: string,
    input: UpdateContactDTOInput,
  ) => Promise<CustomResponse<ContactDTOOutput>>
}

export const IUpdateContactUseCase = Symbol('IUpdateContactUseCase')
