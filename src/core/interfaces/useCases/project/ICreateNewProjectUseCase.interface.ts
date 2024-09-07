import { CreateProjectInputDTO } from 'src/core/dtos/createProjectInput.dto'
import { Project } from 'src/core/entities/Project.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateNewProjectUseCase {
  execute: (
    input: CreateProjectInputDTO,
    userId: string,
  ) => Promise<CustomResponse<Project>>
}

export const ICreateNewProjectUseCase = Symbol('ICreateNewProjectUseCase')
