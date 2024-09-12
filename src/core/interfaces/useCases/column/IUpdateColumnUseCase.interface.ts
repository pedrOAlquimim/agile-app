import { UpdateColumnDTO } from 'src/core/dtos/updateColumn.dto'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IUpdateColumnUseCase {
  execute: (input: UpdateColumnDTO) => Promise<CustomResponse<ColumnCard>>
}

export const IUpdateColumnUseCase = Symbol('IUpdateColumnUseCase')
