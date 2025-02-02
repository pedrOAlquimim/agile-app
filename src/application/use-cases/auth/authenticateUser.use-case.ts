import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { env } from 'src/@env'
import { AuthenticateDTO } from 'src/core/dtos/authenticateUser.dto'
import { LoginDTO } from 'src/core/dtos/login.dto'
import { UserDTO } from 'src/core/dtos/user.dto'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'
import { IAuthenticateUserUseCase } from 'src/core/interfaces/useCases/auth/IAuthenticateUserUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class AnthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(input: LoginDTO) {
    try {
      const response = new CustomResponse<AuthenticateDTO>()

      const { user, errors } = await this.validateUser(input)

      if (!user) return response.addError(errors)

      const payload = {
        username: user.email,
        sub: {
          name: user.firstName,
        },
      }

      response.data = {
        user,
        backendTokens: {
          accessToken: await this.jwtService.signAsync(payload, {
            expiresIn: '20s',
            secret: env.JWT_SECRET_KEY,
          }),

          refreshToken: await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: env.JWT_REFRESH_TOKEN_KEY,
          }),
        },
      }

      return response
    } catch (ex) {
      throw new Error(ex)
    }
  }

  private async validateUser(input: LoginDTO) {
    const existUser = await this.userRepository.findByEmail(input.email)

    if (existUser && (await compare(input.password, existUser.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = existUser
      const result: UserDTO = rest

      return {
        user: result,
        errors: null,
      }
    }

    return {
      errors: ['Email or password is wrong'],
      user: null,
    }
  }
}
