import { z } from 'zod'

export const updateColumnDTOSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(30),
})

export type UpdateColumnDTO = z.infer<typeof updateColumnDTOSchema>
