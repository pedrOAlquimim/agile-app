import { ProjectRoles } from 'src/core/entities/ProjectRoles.entity'
import { BaseRepository } from './BaseRepository'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'

export class ProjectRolesRepository
  extends BaseRepository<ProjectRoles>
  implements IProjectRolesRepository
{
  constructor() {
    super(ProjectRoles)
  }

  async findByRole(role: string) {
    return this.findOne({
      where: {
        role: role,
      },
    })
  }
}
