import { Project } from 'src/core/entities/Project.entity'
import { BaseRepository } from './BaseRepository'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectRepository
  extends BaseRepository<Project>
  implements IProjectRepository
{
  constructor() {
    super(Project)
  }
}
