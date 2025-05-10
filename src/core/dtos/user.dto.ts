import { z } from 'zod'

export const userDTOschema = z
  .object({
    id: z.string().uuid(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    created_at: z.date(),
  })
  .required()

export type UserDTO = z.infer<typeof userDTOschema>
