import { z } from 'zod'
import { ColumnCard } from '../entities/ColumnCard.entity'
import { Card } from '../entities/Card.entity'

export const changeCardFromColumnDTOInputSchema = z.object({
  column: z.custom<ColumnCard>(),
  card: z.custom<Card>(),
})

export type ChangeCardFromColumnDTOInput = z.infer<
  typeof changeCardFromColumnDTOInputSchema
>
