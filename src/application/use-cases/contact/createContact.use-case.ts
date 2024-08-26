import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { ContactDTOOutput } from 'src/core/dtos/contactOutput.dto'
import { CreateContactDTOInput } from 'src/core/dtos/createContactInput.dto'
import { Contact } from 'src/core/entities/Contact.entity'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'
import { ICreateContactUseCase } from 'src/core/interfaces/useCases/ICreateContactUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class CreateContactUseCase implements ICreateContactUseCase {
  constructor(
    @Inject(IContactRepository)
    private readonly contactRepository: IContactRepository,
  ) {}

  async execute(input: CreateContactDTOInput) {
    try {
      const response = new CustomResponse<ContactDTOOutput>()

      const newContact: Contact = {
        id: randomUUID(),
        email: input.email,
        name: input.name,
        phone: input.phone,
        userId: input.userId,
        created_at: new Date(),
      }

      await this.contactRepository.add(newContact)

      const resultNewContact: ContactDTOOutput = { ...newContact }

      response.data = resultNewContact

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
