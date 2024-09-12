import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ISelectColumnByProjectUseCase {
  execute: (projectId: string) => Promise<CustomResponse<ColumnCard[]>>
}

export const ISelectColumnByProjectUseCase = Symbol(
  'ISelectColumnByProjectUseCase',
)
