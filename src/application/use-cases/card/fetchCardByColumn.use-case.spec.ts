import { InMemoryCardRepository } from 'src/infrastructure/persistence/in-memory/in-memory-card-repository'
import { FetchCardByColumnUseCase } from './fetchCardByColumn.use-case'
import { InMemoryColumnRepository } from 'src/infrastructure/persistence/in-memory/in-memory-column-repository'

describe('Change card from column use case', () => {
  let inMemoryCardRepository: InMemoryCardRepository
  let inMemoryColumnRepository: InMemoryColumnRepository
  let sut: FetchCardByColumnUseCase

  beforeEach(() => {
    inMemoryCardRepository = new InMemoryCardRepository()
    inMemoryColumnRepository = new InMemoryColumnRepository()
    sut = new FetchCardByColumnUseCase(
      inMemoryCardRepository,
      inMemoryColumnRepository,
    )
  })

  it('should be able to fetch cards by column', async () => {
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

    await inMemoryCardRepository.add({
      id: 'cardId',
      title: 'Card title',
      description: 'Card description',
      column,
      created_at: new Date(),
    })

    await inMemoryCardRepository.add({
      id: 'cardId2',
      title: 'Card title 2',
      description: 'Card description',
      column,
      created_at: new Date(),
    })

    const { data, success } = await sut.execute(column.id)

    expect(success).toBe(true)
    expect(data).toEqual([
      expect.objectContaining({
        id: 'cardId',
        title: 'Card title',
      }),
      expect.objectContaining({
        id: 'cardId2',
        title: 'Card title 2',
      }),
    ])
  })

  it('should not be able to fetch cards by column that does not exist', async () => {
    const { errors, success } = await sut.execute('columnId')

    expect(success).toBe(false)
    expect(errors).toEqual(['Column does not exist'])
  })
})
