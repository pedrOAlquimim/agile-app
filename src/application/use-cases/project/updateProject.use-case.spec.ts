import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project-repository'
import { UpdateProjectUseCase } from './updateProject.use-case'

let inMemoryProjectRepository: InMemoryProjectRepository
let sut: UpdateProjectUseCase

describe('Update project use case', () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository()
    sut = new UpdateProjectUseCase(inMemoryProjectRepository)
  })

  it('should be able update a project', async () => {
    await inMemoryProjectRepository.add({
      id: '1234',
      title: 'Test project',
      created_at: new Date(),
      projects_projectMembers: [],
      column: [],
    })

    const { data, success } = await sut.execute({ title: 'new title' }, '1234')

    expect(success).toBe(true)
    expect(data).toEqual({
      id: '1234',
      title: 'new title',
      created_at: expect.any(Date),
      projects_projectMembers: [],
      column: [],
    })
  })

  it('should not update when does not have a project', async () => {
    const { data, success, errors } = await sut.execute(
      { title: 'new title' },
      '1234',
    )

    expect(success).toBe(false)
    expect(data).toBe(null)
    expect(errors).toEqual(['Project does not exist'])
  })
})
