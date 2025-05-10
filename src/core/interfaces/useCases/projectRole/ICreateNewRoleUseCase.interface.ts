import { ProjectRoles } from 'src/core/entities/ProjectRoles.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateNewRoleUseCase {
  execute: (roleName: string) => Promise<CustomResponse<ProjectRoles>>
}

export const ICreateNewRoleUseCase = Symbol('ICreateNewRoleUseCase')
