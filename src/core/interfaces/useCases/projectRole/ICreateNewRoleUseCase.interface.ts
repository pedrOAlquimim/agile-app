import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateNewRoleUseCase {
  execute: (roleName: string) => Promise<CustomResponse<void>>
}

export const ICreateNewRoleUseCase = Symbol('ICreateNewRoleUseCase')
