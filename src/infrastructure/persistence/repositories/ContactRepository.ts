import { Contact } from 'src/core/entities/Contact.entity'
import { BaseRepository } from './BaseRepository'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'

export class ContactRepository
  extends BaseRepository<Contact>
  implements IContactRepository
{
  constructor() {
    super(Contact)
  }

  async findAllByUserId(userId: string) {
    return await this.findBy({
      userId: userId,
    })
  }
}
