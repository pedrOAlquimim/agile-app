import { Inject } from '@nestjs/common'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { IDeleteColumnUseCase } from 'src/core/interfaces/useCases/column/IDeleteColumnUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class DeleteColumnUseCase implements IDeleteColumnUseCase {
  constructor(
    @Inject(IColumnRepository)
    private readonly columnRepository: IColumnRepository,
  ) {}

  async execute(columnId: string) {
    try {
      const response = new CustomResponse<ColumnCard>()

      const columnCard = await this.columnRepository.findById(columnId)

      if (!columnCard) return response.addError(['Column does not exist'])

      await this.columnRepository.deleteData(columnId)

      response.data = columnCard

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
