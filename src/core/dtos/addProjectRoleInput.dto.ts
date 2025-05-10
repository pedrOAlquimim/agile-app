import { z } from 'zod'

export const addProjectRoleDTOInputSchema = z.object({
  roleName: z.string(),
})

export type AddProjectRoleDTOInput = z.infer<
  typeof addProjectRoleDTOInputSchema
>
