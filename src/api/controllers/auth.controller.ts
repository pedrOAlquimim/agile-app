import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/ICreateUserUseCase.interface'
import { LoginDTO, loginDTOSchema } from 'src/core/dtos/login.dto'
import {
  CreateUserDTO,
  createUserDTOschema as createUserDTOSchema,
} from 'src/core/dtos/createUser.dto'
import { IAuthenticateUserUseCase } from 'src/core/interfaces/useCases/IAuthenticateUserUseCase.interface'
import { Response } from 'express'

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject(ICreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,

    @Inject(IAuthenticateUserUseCase)
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {}

  @Post('register')
  async register(
    @Body(new ZodPipe(createUserDTOSchema)) input: CreateUserDTO,
    @Res() response: Response,
  ) {
    const result = await this.createUserUseCase.execute(input)

    if (!result.success) return response.status(409).send(result)

    return result
  }

  @Post('login')
  async login(@Body(new ZodPipe(loginDTOSchema)) input: LoginDTO) {
    const response = await this.authenticateUserUseCase.execute(input)
    return response
  }
}
