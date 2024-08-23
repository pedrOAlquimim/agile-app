import { Body, Controller, Post } from '@nestjs/common'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { CreateUserDTO } from 'src/core/dtos/createUser.dto'
import { createUserDTOValidator } from 'src/core/validators/createUser-validator'
import { CreateUserUseCase } from 'src/application/use-cases/auth/createUser.use-case'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('register')
  async register(
    @Body(new ZodPipe(createUserDTOValidator)) input: CreateUserDTO,
  ) {
    const response = await this.createUserUseCase.execute(input)

    return response
  }
}
