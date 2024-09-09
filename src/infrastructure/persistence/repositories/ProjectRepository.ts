import { Project } from 'src/core/entities/Project.entity'
import { BaseRepository } from './BaseRepository'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { Injectable } from '@nestjs/common'
import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'

@Injectable()
export class ProjectRepository
  extends BaseRepository<Project>
  implements IProjectRepository
{
  constructor() {
    super(Project)
  }

  async findAllByOneMember(projects_projectMembers: Projects_ProjectMembers[]) {
    return []
  }
}
