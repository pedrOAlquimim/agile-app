import { InMemoryContactRepository } from 'src/infrastructure/persistence/in-memory/in-memory-contact-repository'
import { CreateContactUseCase } from './createContact.use-case'
import { randomUUID } from 'crypto'

describe('Create contact use case', () => {
  let inMemoryContactRepository: InMemoryContactRepository
  let sut: CreateContactUseCase

  beforeEach(() => {
    inMemoryContactRepository = new InMemoryContactRepository()
    sut = new CreateContactUseCase(inMemoryContactRepository)
  })

  it('should be able create a new contact', async () => {
    const newContact = {
      id: randomUUID(),
      email: 'label@label.com',
      name: 'Gabriel Rodrigues',
      userId: 'exampleUserId',
      phone: '+55 (11) 99999-9999',
      created_at: new Date(),
    }

    const { data, success } = await sut.execute(newContact)

    expect(success).toBe(true)
    expect(data).toEqual({
      id: expect.any(String),
      email: 'label@label.com',
      name: 'Gabriel Rodrigues',
      userId: 'exampleUserId',
      phone: '+55 (11) 99999-9999',
      created_at: expect.any(Date),
    })
  })
})
