import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { IBaseRepository } from './IBaseRepository.interface'

export interface IProjects_ProjectMembers
  extends IBaseRepository<Projects_ProjectMembers> {}

export const IProjects_ProjectMembers = Symbol('IProjects_ProjectMembers')
