import { Contact } from 'src/core/entities/Contact.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IDeleteContactUseCase {
  execute: (contactId: string) => Promise<CustomResponse<Contact>>
}

export const IDeleteContactUseCase = Symbol('IDeleteContactUseCase')
