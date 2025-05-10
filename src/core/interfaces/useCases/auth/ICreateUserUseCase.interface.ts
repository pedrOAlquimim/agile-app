import { CreateUserDTO } from 'src/core/dtos/createUser.dto'
import { UserDTO } from 'src/core/dtos/user.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateUserUseCase {
  execute: (input: CreateUserDTO) => Promise<CustomResponse<UserDTO>>
}

export const ICreateUserUseCase = Symbol('ICreateUserUseCase')
