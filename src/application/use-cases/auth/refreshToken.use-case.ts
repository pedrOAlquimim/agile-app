import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { env } from 'src/@env'

import { RefreshTokenDTO } from 'src/core/dtos/refreshToken.dto'
import { IRefreshTokenUseCase } from 'src/core/interfaces/useCases/IRefreshTokenUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(private jwtService: JwtService) {}

  async execute(user: any) {
    const response = new CustomResponse<RefreshTokenDTO>()

    const payload = {
      username: user.username,
      sub: user.sub,
    }

    const result = {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: env.JWT_SECRET_KEY,
      }),

      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: env.JWT_REFRESH_TOKEN_KEY,
      }),
    }

    response.data = result

    return response
  }
}
