import { z } from 'zod'

export const updateProjectDTOInputSchema = z.object({
  title: z.string(),
})

export type UpdateProjectDTOInput = z.infer<typeof updateProjectDTOInputSchema>
