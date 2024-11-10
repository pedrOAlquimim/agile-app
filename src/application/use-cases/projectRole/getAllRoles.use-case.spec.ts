import { InMemoryProjectRoleRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project-role-repository'
import { GetAllRolesUseCase } from './getAllRoles.use-case'

let inMemoryProjectRoleRepository: InMemoryProjectRoleRepository
let sut: GetAllRolesUseCase

describe('Get all roles use case', () => {
  beforeEach(() => {
    inMemoryProjectRoleRepository = new InMemoryProjectRoleRepository()
    sut = new GetAllRolesUseCase(inMemoryProjectRoleRepository)
  })

  it('should return all roles', async () => {
    await inMemoryProjectRoleRepository.add({
      role: 'role 1',
      id: '123',
      created_at: new Date(),
    })

    await inMemoryProjectRoleRepository.add({
      role: 'role 2',
      id: '1234',
      created_at: new Date(),
    })

    const { data, success } = await sut.execute()

    expect(success).toBe(true)
    expect(data).toEqual([
      {
        role: 'role 1',
        id: '123',
        created_at: expect.any(Date),
      },
      {
        role: 'role 2',
        id: '1234',
        created_at: expect.any(Date),
      },
    ])
  })
})
