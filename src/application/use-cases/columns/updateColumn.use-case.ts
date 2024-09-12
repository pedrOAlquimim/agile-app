import { Inject } from '@nestjs/common'
import { UpdateColumnDTO } from 'src/core/dtos/updateColumn.dto'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { IUpdateColumnUseCase } from 'src/core/interfaces/useCases/column/IUpdateColumnUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class UpdateColumnUseCase implements IUpdateColumnUseCase {
  constructor(
    @Inject(IColumnRepository)
    private readonly columnRepository: IColumnRepository,
  ) {}

  async execute(input: UpdateColumnDTO) {
    try {
      const response = new CustomResponse<ColumnCard>()

      const columnCard = await this.columnRepository.findById(input.id)

      if (!columnCard) return response.addError(['Column does not exist'])

      columnCard.title = input.title

      await this.columnRepository.updateData(columnCard)

      response.data = columnCard

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
