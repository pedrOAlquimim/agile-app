import { InMemoryColumnRepository } from 'src/infrastructure/persistence/in-memory/in-memory-column-repository'
import { SelectColumnsByProjectUseCase } from './selectColumnsByProject.use-case'
import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project-repository'

describe('', () => {
  let inMemoryColumnRepository: InMemoryColumnRepository
  let inMemoryProjectRepository: InMemoryProjectRepository
  let sut: SelectColumnsByProjectUseCase

  beforeEach(() => {
    inMemoryColumnRepository = new InMemoryColumnRepository()
    inMemoryProjectRepository = new InMemoryProjectRepository()
    sut = new SelectColumnsByProjectUseCase(
      inMemoryColumnRepository,
      inMemoryProjectRepository,
    )
  })

  it('should be able to select all columns from a project', async () => {
    await inMemoryProjectRepository.add({
      id: 'projectId',
      title: 'Test project',
      column: [],
      projects_projectMembers: [],
      created_at: new Date(),
    })

    const project = await inMemoryProjectRepository.getProjectById('projectId')

    await inMemoryColumnRepository.add({
      id: 'columnId',
      title: 'column',
      project,
      cards: [],
      nextColumnId: null,
      previusColumnId: null,
      created_at: new Date(),
    })

    const { data, success } = await sut.execute('projectId')

    expect(success).toBe(true)
    expect(data).toEqual([
      {
        id: 'columnId',
        title: 'column',
        project,
        cards: [],
        nextColumnId: null,
        previusColumnId: null,
        created_at: expect.any(Date),
      },
    ])
  })

  it('should not be able to get columns by project that does not exist', async () => {
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

    const { errors, success } = await sut.execute('1234')

    expect(success).toBe(false)
    expect(errors).toEqual(['Project does not exist'])
  })
})
