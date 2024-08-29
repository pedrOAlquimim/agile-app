import { Inject, Injectable } from '@nestjs/common'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'
import { IDeleteContactUseCase } from 'src/core/interfaces/useCases/IDeleteContactUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class DeleteContactUseCase implements IDeleteContactUseCase {
  constructor(
    @Inject(IContactRepository)
    private readonly conatactRepositoty: IContactRepository,
  ) {}

  async execute(contactId: string) {
    try {
      const response = new CustomResponse<null>()

      const contact = await this.conatactRepositoty.findById(contactId)

      if (!contact) {
        return response.addError(['Contact does not exist'])
      }

      await this.conatactRepositoty.deleteData(contactId)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}