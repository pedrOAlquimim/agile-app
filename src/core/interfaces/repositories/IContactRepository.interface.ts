import { IBaseRepository } from './IBaseRepository.interface'
import { Contact } from 'src/core/entities/Contact.entity'

export interface IContactRepository extends IBaseRepository<Contact> {
  findAllByUserId: (userId: string) => Promise<Contact[]>
}

export const IContactRepository = Symbol('IContactRepository')
