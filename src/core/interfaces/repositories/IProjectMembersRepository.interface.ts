import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { IBaseRepository } from './IBaseRepository.interface'

export interface IProjectMembersRepository
  extends IBaseRepository<ProjectMembers> {}

export const IProjectMembersRepository = Symbol('IProjectMembersRepository')
