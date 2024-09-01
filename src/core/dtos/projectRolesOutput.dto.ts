import { z } from 'zod'

export const projectRolesOutputDTO = z.object({
  id: z.string().uuid(),
  role: z.string(),
})

export type ProjectRolesOutputDTO = z.infer<typeof projectRolesOutputDTO>
