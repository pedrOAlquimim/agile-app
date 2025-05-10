import { z } from 'zod'

export const contactDTOOutputSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

export type ContactDTOOutput = z.infer<typeof contactDTOOutputSchema>
