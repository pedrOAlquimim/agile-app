import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateNewRoleUseCase {
  execute: (roleName: string) => Promise<CustomResponse<null>>
}

export const ICreateNewRoleUseCase = Symbol('ICreateNewRoleUseCase')
