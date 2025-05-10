import { ProjectRoles } from 'src/core/entities/ProjectRoles.entity'
import { BaseRepository } from './BaseRepository'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'
import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectRolesRepository
  extends BaseRepository<ProjectRoles>
  implements IProjectRolesRepository
{
  constructor(dataSource: DataSource) {
    super(ProjectRoles, dataSource)
  }

  async findByRole(role: string) {
    return this.findOne({
      where: {
        role: role,
      },
    })
  }
}
