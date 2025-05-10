import { z } from 'zod'

export const projectDTOSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  created_at: z.date(),
})
