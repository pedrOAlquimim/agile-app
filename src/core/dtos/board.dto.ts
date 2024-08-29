import { z } from 'zod'

export const boardDTOSchema = z.object({
  title: z.string().max(20),
})

export type BoardDTO = z.infer<typeof boardDTOSchema>
