import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/ICreateUserUseCase.interface'
import {
  CreateUserDTO,
  createUserDTOschema as createUserDTOSchema,
} from 'src/core/dtos/createUser.dto'

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject(ICreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  @Post('register')
  async register(@Body(new ZodPipe(createUserDTOSchema)) input: CreateUserDTO) {
    const response = await this.createUserUseCase.execute(input)

    return response
  }
}
