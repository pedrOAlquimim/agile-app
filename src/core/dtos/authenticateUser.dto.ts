import { z } from 'zod'
import { userDTOschema } from './user.dto'

export const authenticateDTOSchema = z.object({
  user: userDTOschema,
  backendTokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
})

export type AuthenticateDTO = z.infer<typeof authenticateDTOSchema>
