import { Project } from 'src/core/entities/Project.entity'
import { IBaseRepository } from './IBaseRepository.interface'

export interface IProjectRepository extends IBaseRepository<Project> {
  getProjectsByUserId: (userId: string) => Promise<Project[]>
}

export const IProjectRepository = Symbol('IProjectRepository')
