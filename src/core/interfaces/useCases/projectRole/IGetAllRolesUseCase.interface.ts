import { ProjectRolesOutputDTO } from 'src/core/dtos/projectRolesOutput.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IGetAllRolesUseCase {
  execute: () => Promise<CustomResponse<ProjectRolesOutputDTO[]>>
}

export const IGetAllRolesUseCase = Symbol('IGetAllRolesUseCase')
