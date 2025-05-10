import { Contact } from 'src/core/entities/Contact.entity'
import { BaseRepository } from './BaseRepository'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'
import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class ContactRepository
  extends BaseRepository<Contact>
  implements IContactRepository
{
  constructor(dataSource: DataSource) {
    super(Contact, dataSource)
  }

  async findAllByUserId(userId: string) {
    return await this.findBy({
      userId: userId,
    })
  }
}
