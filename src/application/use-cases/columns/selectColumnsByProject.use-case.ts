import { Inject } from '@nestjs/common'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { ISelectColumnByProjectUseCase } from 'src/core/interfaces/useCases/column/ISelectColumnByProjectUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class SelectColumnsByProjectUseCase
  implements ISelectColumnByProjectUseCase
{
  constructor(
    @Inject(IColumnRepository)
    private readonly columnRepository: IColumnRepository,

    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(projectId: string) {
    try {
      const response = new CustomResponse<ColumnCard[]>()

      const project = await this.projectRepository.findById(projectId)

      if (!project) return response.addError(['Project does not exist'])

      const columns = await this.columnRepository.findByProject(project)

      response.data = columns

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
