import { z } from 'zod'

export const createUserDTOValidator = z.object({
  email: z.string().length(50),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().length(16),
  confirmPassword: z.string().length(16),
})
