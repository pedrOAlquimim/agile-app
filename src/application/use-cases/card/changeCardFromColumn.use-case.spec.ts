import { InMemoryCardRepository } from 'src/infrastructure/persistence/in-memory/in-memory-card-repository'
import { ChangeCardFromColumnUseCase } from './changeCardFromColumn.use-case'
import { InMemoryColumnRepository } from 'src/infrastructure/persistence/in-memory/in-memory-column-repository'

describe('Change card from column use case', () => {
  let inMemoryCardRepository: InMemoryCardRepository
  let inMemoryColumnRepository: InMemoryColumnRepository
  let sut: ChangeCardFromColumnUseCase

  beforeEach(() => {
    inMemoryCardRepository = new InMemoryCardRepository()
    inMemoryColumnRepository = new InMemoryColumnRepository()
    sut = new ChangeCardFromColumnUseCase(inMemoryCardRepository)
  })

  it('should be able change card for another column', async () => {
    const project = {
      id: 'projectId',
      title: 'Test project',
      column: [],
      projects_projectMembers: [],
      created_at: new Date(),
    }

    const column = await inMemoryColumnRepository.add({
      id: 'columnId',
      title: 'column',
      project,
      cards: [],
      nextColumnId: null,
      previusColumnId: null,
      created_at: new Date(),
    })

    const columnTwo = await inMemoryColumnRepository.add({
      id: 'columnIdTwo',
      title: 'column two',
      project,
      cards: [],
      nextColumnId: null,
      previusColumnId: column.id,
      created_at: new Date(),
    })

    await inMemoryCardRepository.add({
      id: 'cardId',
      title: 'Card title',
      description: 'Card description',
      column,
      created_at: new Date(),
    })

    const card = await inMemoryCardRepository.findById('cardId')

    const { data, success } = await sut.execute({
      column: columnTwo,
      card: card,
    })

    expect(success).toBe(true)
    expect(data).toEqual({
      ...columnTwo,
    })
  })
})
