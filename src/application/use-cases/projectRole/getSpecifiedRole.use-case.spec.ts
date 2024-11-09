import { InMemoryProjectRoleRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project-role-repository'
import { GetSpecifiedRoleUseCase } from './getSpecifiedRole.use-case'

let inMemoryProjectRoleRepository: InMemoryProjectRoleRepository
let sut: GetSpecifiedRoleUseCase

describe('Get all roles use case', () => {
  beforeAll(() => {
    inMemoryProjectRoleRepository = new InMemoryProjectRoleRepository()
    sut = new GetSpecifiedRoleUseCase(inMemoryProjectRoleRepository)
  })

  it('should return a specified role', async () => {
    await inMemoryProjectRoleRepository.add({
      role: 'role 1',
      id: '123',
      created_at: new Date(),
    })

    const { data, success } = await sut.execute('role 1')

    expect(success).toBe(true)
    expect(data).toEqual({
      role: 'role 1',
      id: '123',
    })
  })

  it('should not return a specified role if role does not exist', async () => {
    const { data, success, errors } = await sut.execute('some role')

    expect(success).toBe(false)
    expect(data).toBe(null)
    expect(errors).toEqual(['role does not exist'])
  })
})
