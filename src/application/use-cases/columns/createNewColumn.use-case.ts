import { Inject } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateNewColumnDTO } from 'src/core/dtos/createNewColumn.dto'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { ICreateNewColumnUseCase } from 'src/core/interfaces/useCases/column/ICreateNewColumnUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class CreateNewColumnUseCase implements ICreateNewColumnUseCase {
  constructor(
    @Inject(IColumnRepository)
    private readonly columnRepository: IColumnRepository,

    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(input: CreateNewColumnDTO) {
    try {
      const response = new CustomResponse<ColumnCard>()

      const project = await this.projectRepository.findById(input.projectId)

      if (!project) return response.addError(['Project does not exist'])

      const column = await this.columnRepository.findAll()

      if (column.length === 0) {
        const newColumn: ColumnCard = {
          id: randomUUID(),
          title: input.title,
          created_at: new Date(),
          nextColumnId: null,
          previusColumnId: null,
          project: project,
          cards: [],
        }

        await this.columnRepository.add(newColumn)

        response.data = newColumn
      }

      if (column.length > 0) {
        const lastColumn = column[column.length - 1]
        const newColumn: ColumnCard = {
          id: randomUUID(),
          title: input.title,
          created_at: new Date(),
          nextColumnId: null,
          previusColumnId: lastColumn.id,
          project: project,
          cards: [],
        }

        lastColumn.nextColumnId = newColumn.id

        Promise.all([
          this.columnRepository.add(newColumn),
          this.columnRepository.updateData(lastColumn),
        ])

        response.data = newColumn
      }

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
