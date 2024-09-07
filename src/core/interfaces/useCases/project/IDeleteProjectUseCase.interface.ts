import { Project } from 'src/core/entities/Project.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IDeleteProjectUseCase {
  execute(projectId: string): Promise<CustomResponse<Project>>
}

export const IDeleteProjectUseCase = Symbol('IDeleteProjectUseCase')
