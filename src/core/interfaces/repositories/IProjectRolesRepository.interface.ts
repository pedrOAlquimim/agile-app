import { ProjectRoles } from 'src/core/entities/ProjectRoles.entity'
import { IBaseRepository } from './IBaseRepository.interface'

export interface IProjectRolesRepository extends IBaseRepository<ProjectRoles> {
  findByRole: (role: string) => Promise<ProjectRoles>
}

export const IProjectRolesRepository = Symbol('IProjectRolesRepository')
