import { InMemoryColumnRepository } from 'src/infrastructure/persistence/in-memory/in-memory-column-repository'
import { CreateNewColumnUseCase } from './createNewColumn.use-case'
import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project-repository'

describe('Create new column use case', () => {
  let inMemoryColumnRepository: InMemoryColumnRepository
  let inMemoryProjectRepository: InMemoryProjectRepository
  let sut: CreateNewColumnUseCase

  beforeEach(() => {
    inMemoryColumnRepository = new InMemoryColumnRepository()
    inMemoryProjectRepository = new InMemoryProjectRepository()
    sut = new CreateNewColumnUseCase(
      inMemoryColumnRepository,
      inMemoryProjectRepository,
    )
  })

  it('should not be able to create a column when does not have a project', async () => {
    const { errors, success } = await sut.execute({
      projectId: '123',
      title: 'New column',
    })

    expect(success).toBe(false)
    expect(errors).toEqual(['Project does not exist'])
  })

  it('should be able to create new column when project does not have columns yet', async () => {
    await inMemoryProjectRepository.add({
      id: 'projectId',
      title: 'Test project',
      column: [],
      projects_projectMembers: [],
      created_at: new Date(),
    })

    const project = await inMemoryProjectRepository.getProjectById('projectId')

    const { data, success } = await sut.execute({
      projectId: project.id,
      title: 'New column',
    })

    expect(success).toBe(true)
    expect(data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'New column',
      }),
    )
  })

  it('should be able to create new column with previousColumnId when project has columns', async () => {
    await inMemoryProjectRepository.add({
      id: 'projectId',
      title: 'Test project',
      column: [],
      projects_projectMembers: [],
      created_at: new Date(),
    })

    const project = await inMemoryProjectRepository.getProjectById('projectId')

    const previusColumn = await inMemoryColumnRepository.add({
      id: 'columnId',
      title: 'column',
      project,
      cards: [],
      nextColumnId: null,
      previusColumnId: null,
      created_at: new Date(),
    })

    const { data, success } = await sut.execute({
      projectId: project.id,
      title: 'New column',
    })

    expect(success).toBe(true)
    expect(data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'New column',
        previusColumnId: previusColumn.id,
      }),
    )
  })
})
