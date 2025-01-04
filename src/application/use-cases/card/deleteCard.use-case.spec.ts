import { InMemoryCardRepository } from 'src/infrastructure/persistence/in-memory/in-memory-card-repository'
import { DeleteCardUseCase } from './deleteCard.use-case'
import { InMemoryColumnRepository } from 'src/infrastructure/persistence/in-memory/in-memory-column-repository'

describe('Change card from column use case', () => {
  let inMemoryCardRepository: InMemoryCardRepository
  let inMemoryColumnRepository: InMemoryColumnRepository
  let sut: DeleteCardUseCase

  beforeEach(() => {
    inMemoryCardRepository = new InMemoryCardRepository()
    inMemoryColumnRepository = new InMemoryColumnRepository()
    sut = new DeleteCardUseCase(inMemoryCardRepository)
  })

  it('should be able to delete the card', async () => {
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

    const card = await inMemoryCardRepository.add({
      id: 'cardId',
      title: 'Card title',
      description: 'Card description',
      column,
      created_at: new Date(),
    })

    const { data, success } = await sut.execute(card.id)

    expect(success).toBe(true)
    expect(data).toEqual(card)
  })

  it('should not be able to delete the card when card does not exist', async () => {
    const project = {
      id: 'projectId',
      title: 'Test project',
      column: [],
      projects_projectMembers: [],
      created_at: new Date(),
    }

    await inMemoryColumnRepository.add({
      id: 'columnId',
      title: 'column',
      project,
      cards: [],
      nextColumnId: null,
      previusColumnId: null,
      created_at: new Date(),
    })

    const { errors, success } = await sut.execute('cardId')

    expect(success).toBe(false)
    expect(errors).toEqual(['Card does not exist'])
  })
})
