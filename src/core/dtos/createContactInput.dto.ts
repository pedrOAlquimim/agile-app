import { z } from 'zod'

export const createContactDTOSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

export type CreateContactDTOInput = z.infer<typeof createContactDTOSchema>
