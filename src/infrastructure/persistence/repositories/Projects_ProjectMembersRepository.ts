import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { BaseRepository } from './BaseRepository'
import { Injectable } from '@nestjs/common'
import { IProjects_ProjectMembersRepository } from 'src/core/interfaces/repositories/IProjects_ProjectMembers.interface'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'

@Injectable()
export class Projects_ProjectMembersRepository
  extends BaseRepository<Projects_ProjectMembers>
  implements IProjects_ProjectMembersRepository
{
  constructor() {
    super(Projects_ProjectMembers)
  }
  async findAllByProjectMember(projectMember: ProjectMembers) {
    return await this.findBy({ projectMember })
  }
}
