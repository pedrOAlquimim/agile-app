import { Project } from 'src/core/entities/Project.entity'
import { IBaseRepository } from './IBaseRepository.interface'
import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'

export interface IProjectRepository extends IBaseRepository<Project> {
  findAllByOneMember: (
    projects_projectMembers: Projects_ProjectMembers,
  ) => Promise<Project[]>
}

export const IProjectRepository = Symbol('IProjectRepository')
