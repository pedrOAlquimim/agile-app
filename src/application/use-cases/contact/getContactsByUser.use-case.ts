import { Inject, Injectable } from '@nestjs/common'
import { ContactDTOOutput } from 'src/core/dtos/contactOutput.dto'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'
import { IGetContactsByUserUseCase } from 'src/core/interfaces/useCases/IGetContactsByUserUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class GetContactByUserUseCase implements IGetContactsByUserUseCase {
  constructor(
    @Inject(IContactRepository)
    private readonly conatactRepositoty: IContactRepository,
  ) {}

  async execute(userId: string) {
    try {
      const response = new CustomResponse<ContactDTOOutput[]>()

      const contacts = await this.conatactRepositoty.findAllByUserId(userId)

      response.data = contacts

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
