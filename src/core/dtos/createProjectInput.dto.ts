import { z } from 'zod'

export const createProjectInputDTOSchema = z.object({
  title: z.string(),
})

export type CreateProjectInputDTO = z.infer<typeof createProjectInputDTOSchema>
