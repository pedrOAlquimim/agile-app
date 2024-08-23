import { User } from 'src/core/entities/User.entity'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User>
}
