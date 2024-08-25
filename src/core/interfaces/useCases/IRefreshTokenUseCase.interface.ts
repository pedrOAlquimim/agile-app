import { RefreshTokenDTO } from 'src/core/dtos/refreshToken.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IRefreshTokenUseCase {
  execute: (user: any) => Promise<CustomResponse<RefreshTokenDTO>>
}

export const IRefreshTokenUseCase = Symbol('IRefreshTokenUseCase')
