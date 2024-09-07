import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { BaseRepository } from './BaseRepository'
import { IProjectMembersRepository } from 'src/core/interfaces/repositories/IProjectMembersRepository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectMembersRepository
  extends BaseRepository<ProjectMembers>
  implements IProjectMembersRepository
{
  constructor() {
    super(ProjectMembers)
  }

  async findByUserId(userId: string) {
    return await this.findOne({
      where: {
        userId,
      },
    })
  }
}
