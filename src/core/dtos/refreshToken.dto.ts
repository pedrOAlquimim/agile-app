import { z } from 'zod'

export const refreshTokenDTOSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type RefreshTokenDTO = z.infer<typeof refreshTokenDTOSchema>
