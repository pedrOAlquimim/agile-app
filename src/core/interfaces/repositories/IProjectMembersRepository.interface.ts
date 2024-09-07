import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { IBaseRepository } from './IBaseRepository.interface'

export interface IProjectMembersRepository
  extends IBaseRepository<ProjectMembers> {
  findByUserId: (userId: string) => Promise<ProjectMembers>
}

export const IProjectMembersRepository = Symbol('IProjectMembersRepository')
