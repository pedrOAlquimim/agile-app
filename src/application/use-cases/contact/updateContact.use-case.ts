import { Inject, Injectable } from '@nestjs/common'
import { ContactDTOOutput } from 'src/core/dtos/contactOutput.dto'
import { UpdateContactDTOInput } from 'src/core/dtos/updateContact.dto'
import { Contact } from 'src/core/entities/Contact.entity'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'
import { IUpdateContactUseCase } from 'src/core/interfaces/useCases/contact/IUpdateContactUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class UpdateContactUseCase implements IUpdateContactUseCase {
  constructor(
    @Inject(IContactRepository)
    private readonly conatactRepositoty: IContactRepository,
  ) {}

  async execute(contactId: string, input: UpdateContactDTOInput) {
    try {
      const response = new CustomResponse<ContactDTOOutput>()

      const contact = await this.conatactRepositoty.findById(contactId)

      if (!contact) {
        return response.addError(['Contact does not exist'])
      }

      const updateContact: Contact = {
        ...contact,
        email: input.email,
        name: input.name,
        phone: input.phone,
      }

      await this.conatactRepositoty.updateData(updateContact)

      const result: ContactDTOOutput = { ...updateContact }

      response.data = result

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
