import { CreateNewColumnDTO } from 'src/core/dtos/createNewColumn.dto'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateNewColumnUseCase {
  execute: (input: CreateNewColumnDTO) => Promise<CustomResponse<ColumnCard>>
}

export const ICreateNewColumnUseCase = Symbol('ICreateNewColumnUseCase')
