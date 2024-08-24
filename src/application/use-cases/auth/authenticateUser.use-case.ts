import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { env } from 'src/@env'
import { AuthenticateDTO } from 'src/core/dtos/authenticateUser.dto'
import { LoginDTO } from 'src/core/dtos/login.dto'
import { UserDTO } from 'src/core/dtos/user.dto'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'
import { IAuthenticateUserUseCase } from 'src/core/interfaces/useCases/IAuthenticateUserUseCase.interface'
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

      const user = await this.validateUser(input)

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
            expiresIn: '1h',
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
      throw new Error('error')
    }
  }

  async validateUser(input: LoginDTO): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(input.email)

    if (user && (await compare(input.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user
      const result: UserDTO = rest

      return result
    }

    throw new UnauthorizedException()
  }
}
