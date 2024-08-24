import { CreateUserDTO } from 'src/core/dtos/createUser.dto'
import { User } from 'src/core/entities/User.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateUserUseCase {
  execute: (input: CreateUserDTO) => Promise<CustomResponse<User>>
}

export const ICreateUserUseCase = Symbol('ICreateUserUseCase')
