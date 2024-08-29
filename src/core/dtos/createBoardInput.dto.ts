import { z } from 'zod'

export const createBoardDTOInputSchema = z.object({
  title: z.string().max(20),
})

export type CreateBoardInputDTOInput = z.infer<typeof createBoardDTOInputSchema>
