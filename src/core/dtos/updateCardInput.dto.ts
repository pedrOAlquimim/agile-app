import { z } from 'zod'

export const updateCardDTOInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  cardId: z.string(),
})

export type UpdateCardDTOInput = z.infer<typeof updateCardDTOInputSchema>
