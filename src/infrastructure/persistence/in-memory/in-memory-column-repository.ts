import { randomUUID } from 'crypto'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { Project } from 'src/core/entities/Project.entity'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'

export class InMemoryColumnRepository implements IColumnRepository {
  public items: ColumnCard[] = []

  async findByProject(project: Project): Promise<ColumnCard[]> {
    return this.items.filter((item) => item.project === project)
  }

  async add(input: ColumnCard): Promise<ColumnCard> {
    const column: ColumnCard = {
      id: input.id ?? randomUUID(),
      title: input.title,
      project: input.project,
      nextColumnId: input.nextColumnId,
      previusColumnId: input.previusColumnId,
      cards: input.cards,
      created_at: input.created_at ?? new Date(),
    }

    this.items.push(column)

    return column
  }

  async updateData(input: ColumnCard): Promise<ColumnCard> {
    const columnIndex = this.items.findIndex((item) => item.id === input.id)

    if (columnIndex !== 1) return null

    const column: ColumnCard = {
      id: input.id,
      title: input.title,
      project: input.project,
      nextColumnId: input.nextColumnId,
      previusColumnId: input.previusColumnId,
      cards: input.cards,
      created_at: input.created_at,
    }

    this.items.splice(columnIndex, 1, column)

    return column
  }

  async deleteData(id: string): Promise<ColumnCard> {
    const column = this.items.find((item) => item.id === id)

    if (!column) return null

    this.items = this.items.filter((item) => item.id !== id)

    return column
  }

  async findById(id: string): Promise<ColumnCard> {
    const column = this.items.find((item) => item.id === id)

    if (!column) return null

    return column
  }

  async findAll(): Promise<ColumnCard[]> {
    return this.items
  }
}
