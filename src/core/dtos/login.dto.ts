import { z } from 'zod'

export const loginDTOSchema = z
  .object({
    email: z
      .string()
      .email()
      .max(50)
      .refine((val) => val.length < 50, {
        message: 'Email is not more than 50 characters',
      }),
    password: z
      .string()
      .max(16)
      .refine((val) => val.length < 16, {
        message: 'Password is not more than 16 characters',
      }),
  })
  .required()

export type LoginDTO = z.infer<typeof loginDTOSchema>
