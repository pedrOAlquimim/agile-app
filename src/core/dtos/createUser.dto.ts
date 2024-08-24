import { z } from 'zod'

export const createUserDTOschema = z
  .object({
    email: z.string().max(50),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().max(16),
    confirmPassword: z.string().max(16),
  })
  .required()

export type CreateUserDTO = z.infer<typeof createUserDTOschema>
