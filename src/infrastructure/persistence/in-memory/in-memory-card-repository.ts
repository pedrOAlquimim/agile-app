import { randomUUID } from 'crypto'
import { Card } from 'src/core/entities/Card.entity'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'

export class InMemoryCardRepository implements ICardRepository {
  public items: Card[] = []

  async findByColumn(column: ColumnCard): Promise<Card[]> {
    return this.items.filter((item) => item.column === column)
  }

  async add(input: Card): Promise<Card> {
    const card: Card = {
      id: input.id ?? randomUUID(),
      title: input.title,
      column: input.column,
      description: input.description,
      created_at: input.created_at ?? new Date(),
    }

    this.items.push(card)

    return card
  }

  async updateData(input: Card): Promise<Card> {
    const cardIndex = this.items.findIndex((item) => item.id === input.id)

    if (cardIndex !== 1) return null

    const card: Card = {
      id: input.id,
      title: input.title,
      column: input.column,
      description: input.description,
      created_at: input.created_at,
    }

    this.items.splice(cardIndex, 1, card)

    return card
  }

  async deleteData(id: string): Promise<Card> {
    const card = this.items.find((item) => item.id === id)

    if (!card) return null

    this.items = this.items.filter((item) => item.id !== id)

    return card
  }

  async findById(id: string): Promise<Card> {
    const card = this.items.find((item) => item.id === id)

    if (!card) return null

    return card
  }

  async findAll(): Promise<Card[]> {
    return this.items
  }
}
