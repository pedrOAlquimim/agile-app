import { ProjectRolesOutputDTO } from 'src/core/dtos/projectRolesOutput.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IGetSpecifiedRoleUseCase {
  execute: (roleName: string) => Promise<CustomResponse<ProjectRolesOutputDTO>>
}

export const IGetSpecifiedRoleUseCase = Symbol('IGetSpecifiedRoleUseCase')
