import { z } from 'zod'

export const createNewColumnDTOSchema = z.object({
  title: z.string().max(30),
  projectId: z.string().uuid(),
})

export type CreateNewColumnDTO = z.infer<typeof createNewColumnDTOSchema>
