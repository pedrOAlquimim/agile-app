import { InMemoryProjectRoleRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project-role-repository'
import { CreateNewRoleUseCase } from './createNewRole.use-case'

let inMemoryProjectRoleRepository: InMemoryProjectRoleRepository
let sut: CreateNewRoleUseCase

describe('Crete new Project Role use caase', () => {
  beforeEach(() => {
    inMemoryProjectRoleRepository = new InMemoryProjectRoleRepository()
    sut = new CreateNewRoleUseCase(inMemoryProjectRoleRepository)
  })

  it('should be able to creaate aa project role', async () => {
    const { success, data } = await sut.execute('teste role')

    expect(success).toBe(true)
    expect(data.id).toEqual(expect.any(String))
  })

  it('should return error when try to crete a role that alreaady exists', async () => {
    await inMemoryProjectRoleRepository.add({
      role: 'Teste existente',
      id: '123',
      created_at: new Date(),
    })

    const { success, data, errors } = await sut.execute('Teste existente')

    expect(success).toBe(false)
    expect(data).toBe(null)
    expect(errors).toEqual(['role already exist'])
  })
})
