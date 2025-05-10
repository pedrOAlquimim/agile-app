import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { IBaseRepository } from './IBaseRepository.interface'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'

export interface IProjects_ProjectMembersRepository
  extends IBaseRepository<Projects_ProjectMembers> {
  findAllByProjectMember: (
    projectMember: ProjectMembers,
  ) => Promise<Projects_ProjectMembers[]>
}

export const IProjects_ProjectMembersRepository = Symbol(
  'IProjects_ProjectMembersRepository',
)
