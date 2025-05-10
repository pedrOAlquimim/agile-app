import { Project } from 'src/core/entities/Project.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IGetProjectsByUserUseCase {
  execute: (userId: string) => Promise<CustomResponse<Project[]>>
}

export const IGetProjectsByUserUseCase = Symbol('IGetProjectsByUserUseCase')
