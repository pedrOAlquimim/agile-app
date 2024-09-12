import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { IBaseRepository } from './IBaseRepository.interface'
import { Project } from 'src/core/entities/Project.entity'

export interface IColumnRepository extends IBaseRepository<ColumnCard> {
  findByProject: (project: Project) => Promise<ColumnCard[]>
}

export const IColumnRepository = Symbol('IColumnRepository')
