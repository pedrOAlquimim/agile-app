import { User } from 'src/core/entities/User.entity'
import { IBaseRepository } from './IBaseRepository.interface'

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail: (email: string) => Promise<User>
}

export const IUserRepository = Symbol('IUserRepository')
