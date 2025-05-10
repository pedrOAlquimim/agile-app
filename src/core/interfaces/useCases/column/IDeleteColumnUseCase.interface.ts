import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IDeleteColumnUseCase {
  execute: (columnId: string) => Promise<CustomResponse<ColumnCard>>
}

export const IDeleteColumnUseCase = Symbol('IDeleteColumnUseCase')
