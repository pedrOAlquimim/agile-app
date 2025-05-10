import { z } from 'zod'

export const createProjectMemberInputDTOSchema = z.object({
  userId: z.string().uuid(),
})

export type CreateProjectMemberInputDTO = z.infer<
  typeof createProjectMemberInputDTOSchema
>
