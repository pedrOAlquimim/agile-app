import { User } from 'src/core/entities/User.entity'
import { BaseRepository } from './BaseRepository'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(User)
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: {
        email,
      },
    })
  }
}
