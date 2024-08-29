import { z } from 'zod'

export const updateBoardDTOInputSchema = z.object({
  title: z.string().max(20),
})

export type UpdateBoardDTO = z.infer<typeof updateBoardDTOInputSchema>
