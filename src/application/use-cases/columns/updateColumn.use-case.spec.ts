import { InMemoryColumnRepository } from 'src/infrastructure/persistence/in-memory/in-memory-column-repository'
import { UpdateColumnUseCase } from './updateColumn.use-case'

describe('Update column use case', () => {
  let inMemoryColumnRepository: InMemoryColumnRepository
  let sut: UpdateColumnUseCase

  beforeEach(() => {
    inMemoryColumnRepository = new InMemoryColumnRepository()
    sut = new UpdateColumnUseCase(inMemoryColumnRepository)
  })

  it('should be able update a column', async () => {
    await inMemoryColumnRepository.add({
      id: '1234',
      nextColumnId: null,
      previusColumnId: null,
      title: 'Label',
      created_at: new Date(),
      cards: [],
      project: {
        id: 'projectId',
        column: [],
        created_at: new Date('2024-12-22T14:00:00.000Z'),
        title: 'ProjectLabel',
        projects_projectMembers: [],
      },
    })

    const { data, success } = await sut.execute({
      id: '1234',
      title: 'Label new',
    })

    expect(success).toBe(true)
    expect(data).toEqual({
      id: '1234',
      nextColumnId: null,
      previusColumnId: null,
      title: 'Label new',
      created_at: expect.any(Date),
      cards: [],
      project: {
        id: 'projectId',
        column: [],
        created_at: expect.any(Date),
        title: 'ProjectLabel',
        projects_projectMembers: [],
      },
    })
  })
})
