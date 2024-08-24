import { AuthenticateDTO } from 'src/core/dtos/authenticateUser.dto'
import { LoginDTO } from 'src/core/dtos/login.dto'
import { UserDTO } from 'src/core/dtos/user.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IAuthenticateUserUseCase {
  execute: (input: LoginDTO) => Promise<CustomResponse<AuthenticateDTO>>
  validateUser: (input: LoginDTO) => Promise<UserDTO>
}

export const IAuthenticateUserUseCase = Symbol('IAuthenticateUserUseCase')
