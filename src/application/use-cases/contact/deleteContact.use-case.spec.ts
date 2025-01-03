import { InMemoryContactRepository } from "src/infrastructure/persistence/in-memory/in-memory-contact-repository"
import { DeleteContactUseCase } from "./deleteContact.use-case"

describe('Delete contact use case', () => {
  let sut: DeleteContactUseCase
  let inMemoryContactRepository: InMemoryContactRepository

  beforeEach(() => {
    inMemoryContactRepository = new InMemoryContactRepository()
    sut = new DeleteContactUseCase(inMemoryContactRepository)
  })

  it('should be able to delete a contact', async () => {
    await inMemoryContactRepository.add({
      id: '1234',
      email: 'label@label.com',
      name: 'Gabriel Rodrigues',
      userId: 'exampleUserId',
      phone: '+55 (11) 99999-9999',
      created_at: new Date(),
    })

    const { data, success } = await sut.execute('1234')

    expect(success).toBe(true)
    expect(data).toEqual({
      id: '1234',
      email: 'label@label.com',
      name: 'Gabriel Rodrigues',
      userId: 'exampleUserId',
      phone: '+55 (11) 99999-9999',
      created_at: expect.any(Date),
    })
  })

  it('should not be able to delete a contact with worng Id', async () => {
    await inMemoryContactRepository.add({
      id: '1234',
      email: 'label@label.com',
      name: 'Gabriel Rodrigues',
      userId: 'exampleUserId',
      phone: '+55 (11) 99999-9999',
      created_at: new Date(),
    })

    const { errors, success } = await sut.execute('12345')

    expect(success).toBe(false)
    expect(errors).toEqual(['Contact does not exist'])
  })
})