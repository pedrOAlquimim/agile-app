import { z } from 'zod'

export const createNewCardDTOInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  columnId: z.string().uuid(),
})

export type CreateNewCardDTOInput = z.infer<typeof createNewCardDTOInputSchema>
