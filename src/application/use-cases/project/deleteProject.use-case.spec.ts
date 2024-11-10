import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project-repository'
import { DeleteProjectUseCase } from './deleteProject.use-case'
import { randomUUID } from 'crypto'

let inMemoryProjectRepository: InMemoryProjectRepository
let sut: DeleteProjectUseCase

describe('Delete project use case', () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository()
    sut = new DeleteProjectUseCase(inMemoryProjectRepository)
  })

  it('should delete a project', async () => {
    const projectToDelete = await inMemoryProjectRepository.add({
      id: randomUUID(),
      title: 'Test project',
      created_at: new Date(),
      projects_projectMembers: [],
      column: [],
    })

    const { data, success } = await sut.execute(projectToDelete.id)

    expect(success).toBe(true)
    expect(data).toEqual(projectToDelete)
  })

  it('should not delete when does not have a project', async () => {
    const { data, success, errors } = await sut.execute('projectId')

    expect(success).toBe(false)
    expect(data).toBe(null)
    expect(errors).toEqual(['Project does not exist'])
  })
})
