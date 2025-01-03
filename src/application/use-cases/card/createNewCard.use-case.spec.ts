import { InMemoryCardRepository } from "src/infrastructure/persistence/in-memory/in-memory-card-repository"
import { CreateNewCardUseCase } from "./createNewCard.use-case"
import { InMemoryColumnRepository } from "src/infrastructure/persistence/in-memory/in-memory-column-repository"

describe('Create new card use case', () => {
  let inMemoryCardRepository: InMemoryCardRepository
  let inMemoryColumnRepository: InMemoryColumnRepository
  let sut: CreateNewCardUseCase

  beforeEach(() => {
    inMemoryCardRepository = new InMemoryCardRepository()
    inMemoryColumnRepository = new InMemoryColumnRepository()
    sut = new CreateNewCardUseCase(
      inMemoryCardRepository,
      inMemoryColumnRepository,
    )
  })

  it('should be able to create a card inside a column', async () => {
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
      created_at: new Date()
    })
    
    const { data, success } = await sut.execute({
      columnId: column.id,
      title: 'New card',
      description: 'New card description'
    })

    expect(success).toBe(true)
    expect(data).toEqual(
      expect.objectContaining({
        title: 'New card',
        description: 'New card description',
      }),
    )
  })

  it('should not be able to create a card when does not exist a column', async () => {

    const { errors, success } = await sut.execute({
      columnId: 'columnId',
      title: 'New card',
      description: 'New card description'
    })

    expect(success).toBe(false)
    expect(errors).toEqual(['Column does not exist'])
  })
})