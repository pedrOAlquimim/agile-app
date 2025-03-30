import { z } from 'zod'

export const createNewColumnDTOSchema = z.object({
  title: z
    .string()
    .max(30)
    .refine((val) => val.length < 30, {
      message: 'Column title should have a maximum of 30 caracters',
    }),
  projectId: z.string().uuid(),
})

export type CreateNewColumnDTO = z.infer<typeof createNewColumnDTOSchema>
