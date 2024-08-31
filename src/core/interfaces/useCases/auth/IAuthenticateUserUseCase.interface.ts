import { AuthenticateDTO } from 'src/core/dtos/authenticateUser.dto'
import { LoginDTO } from 'src/core/dtos/login.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IAuthenticateUserUseCase {
  execute: (input: LoginDTO) => Promise<CustomResponse<AuthenticateDTO>>
}

export const IAuthenticateUserUseCase = Symbol('IAuthenticateUserUseCase')
