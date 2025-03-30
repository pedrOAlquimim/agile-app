import { z } from 'zod'

export const updateColumnDTOSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .max(30)
    .refine((val) => val.length < 30, {
      message: 'Column title should have a maximum of 30 caracters',
    }),
})

export type UpdateColumnDTO = z.infer<typeof updateColumnDTOSchema>
