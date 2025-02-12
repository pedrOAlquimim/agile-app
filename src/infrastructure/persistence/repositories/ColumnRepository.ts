import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { BaseRepository } from './BaseRepository'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { Project } from 'src/core/entities/Project.entity'
import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ColumnRepository
  extends BaseRepository<ColumnCard>
  implements IColumnRepository
{
  constructor(dataSource: DataSource) {
    super(ColumnCard, dataSource)
  }

  async findByProject(project: Project) {
    return await this.find({
      where: {
        project: project,
      },
    })
  }
}
