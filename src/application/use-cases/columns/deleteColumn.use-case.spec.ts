import { InMemoryColumnRepository } from 'src/infrastructure/persistence/in-memory/in-memory-column-repository'
import { DeleteColumnUseCase } from './deleteColumn.use-case'

describe('Delete column use case', () => {
  let inMemoryColumnRepository: InMemoryColumnRepository
  let sut: DeleteColumnUseCase

  beforeEach(() => {
    inMemoryColumnRepository = new InMemoryColumnRepository()
    sut = new DeleteColumnUseCase(inMemoryColumnRepository)
  })

  it('should be able to delete a column', async () => {
    await inMemoryColumnRepository.add({
      id: 'columnId',
      title: 'column',
      project: {
        id: 'projectId',
        title: 'Test project',
        column: [],
        projects_projectMembers: [],
        created_at: new Date(),
      },
      cards: [],
      nextColumnId: null,
      previusColumnId: null,
      created_at: new Date(),
    })

    const { data, success } = await sut.execute('columnId')

    expect(success).toBe(true)
    expect(data).toEqual({
      id: 'columnId',
      title: 'column',
      project: {
        id: 'projectId',
        title: 'Test project',
        column: [],
        projects_projectMembers: [],
        created_at: expect.any(Date),
      },
      cards: [],
      nextColumnId: null,
      previusColumnId: null,
      created_at: expect.any(Date),
    })
  })

  it('should not be able to delete a column that does not exist', async () => {
    const { errors, success } = await sut.execute('columnId')

    expect(success).toBe(false)
    expect(errors).toEqual(['Column does not exist'])
  })
})
