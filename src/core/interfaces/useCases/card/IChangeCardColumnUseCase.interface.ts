import { ChangeCardFromColumnDTOInput } from 'src/core/dtos/changeCardFromColumnInput.dto'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IChangeCardColumnUseCase {
  execute: (
    input: ChangeCardFromColumnDTOInput,
  ) => Promise<CustomResponse<ColumnCard>>
}

export const IChangeCardColumnUseCase = Symbol('IChangeCardColumnUseCase')
