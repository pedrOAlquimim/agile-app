import { InMemoryCardRepository } from "src/infrastructure/persistence/in-memory/in-memory-card-repository"
import { InMemoryColumnRepository } from "src/infrastructure/persistence/in-memory/in-memory-column-repository"
import { UpdateCardUseCase } from "./updateCard.use-case"

describe('Change card from column use case', () => {
  let inMemoryCardRepository: InMemoryCardRepository
  let inMemoryColumnRepository: InMemoryColumnRepository
  let sut: UpdateCardUseCase

  beforeEach(() => {
    inMemoryCardRepository = new InMemoryCardRepository()
    inMemoryColumnRepository = new InMemoryColumnRepository()
    sut = new UpdateCardUseCase(inMemoryCardRepository)
  })


  it('should be able update a card', async () => {
    const project = {
      id: 'projectId',
      title: 'Test project',
      column: [],
      projects_projectMembers: [],
      created_at: new Date(),
    }

    const column = {
      id: 'columnId',
      title: 'column',
      project,
      cards: [],
      nextColumnId: null,
      previusColumnId: null,
      created_at: new Date()
    }

    const card = await inMemoryCardRepository.add({
      id: 'cardId',
      title: 'Card title',
      description: 'Card description',
      column,
      created_at: new Date()
    })

    const { data, success } = await sut.execute({
      cardId: card.id,
      title: 'New title',
      description: 'New description',
    })

    expect(success).toBe(true)
    expect(data).toEqual(
      expect.objectContaining({
        title: 'New title',
        description: 'New description',
      })
    )
  })

  it('should not be able update card when does not exist', async () => {
    const { errors, success } = await sut.execute({
      cardId: 'cardId',
      title: 'New title',
      description: 'New description',
    })

    expect(success).toBe(false)
    expect(errors).toEqual(['Card does not exist'])
  })
})