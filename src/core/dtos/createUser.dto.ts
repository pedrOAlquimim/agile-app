import { z } from 'zod'

export const createUserDTOschema = z
  .object({
    email: z
      .string()
      .email()
      .max(50)
      .refine((val) => val.length < 50, {
        message: 'Email is not more than 50 characters',
      }),
    firstName: z.string(),
    lastName: z.string(),
    password: z
      .string()
      .max(16)
      .refine((val) => val.length < 16, {
        message: 'Password is not more than 16 characters',
      }),
    confirmPassword: z
      .string()
      .max(16)
      .refine((val) => val.length < 16, {
        message: 'Confirm Password is not more than 16 characters',
      }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type CreateUserDTO = z.infer<typeof createUserDTOschema>
