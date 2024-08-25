import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/ICreateUserUseCase.interface'
import { LoginDTO, loginDTOSchema } from 'src/core/dtos/login.dto'
import { IAuthenticateUserUseCase } from 'src/core/interfaces/useCases/IAuthenticateUserUseCase.interface'
import { Response } from 'express'
import { RefreshJwtGuard } from '../utils/guards/refreshJwtGuard.guard'
import {
  CreateUserDTO,
  createUserDTOschema as createUserDTOSchema,
} from 'src/core/dtos/createUser.dto'
import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { IRefreshTokenUseCase } from 'src/core/interfaces/useCases/IRefreshTokenUseCase.interface'

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject(ICreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,

    @Inject(IAuthenticateUserUseCase)
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,

    @Inject(IRefreshTokenUseCase)
    private readonly refreshTokenUseCase: IRefreshTokenUseCase,
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

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return await this.refreshTokenUseCase.execute(req.user)
  }
}
