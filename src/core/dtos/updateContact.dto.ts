import { z } from 'zod'

export const updateContactDTOSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

export type UpdateContactDTOInput = z.infer<typeof updateContactDTOSchema>
