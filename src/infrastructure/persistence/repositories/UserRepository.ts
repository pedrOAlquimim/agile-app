import { User } from 'src/core/entities/User.entity'
import { BaseRepository } from './BaseRepository'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'
import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(dataSource: DataSource) {
    super(User, dataSource)
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: {
        email,
      },
    })
  }
}
