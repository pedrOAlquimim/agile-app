import { InMemoryContactRepository } from "src/infrastructure/persistence/in-memory/in-memory-contact-repository"
import { GetContactByUserUseCase } from "./getContactsByUser.use-case"

describe('Get contacts by user', () => {
  let sut: GetContactByUserUseCase
  let inMemoryContactRepository: InMemoryContactRepository

  beforeEach(() => {
    inMemoryContactRepository = new InMemoryContactRepository()
    sut = new GetContactByUserUseCase(inMemoryContactRepository)
  })

  it('should be able to get all contacts from user', async () => {
    await inMemoryContactRepository.add({
      id: '1234',
      email: 'label@label.com',
      name: 'Giovane Lacerda',
      userId: 'exampleUserId',
      phone: '+55 (11) 99999-9999',
      created_at: new Date(),
    })

    await inMemoryContactRepository.add({
      id: '12345',
      email: 'label1@label.com',
      name: 'Gabriel Rodrigues',
      userId: 'exampleUserId',
      phone: '+55 (11) 99999-9999',
      created_at: new Date(),
    })

    const { data, success } = await sut.execute('exampleUserId')

    expect(success).toBe(true)
    expect(data).toEqual([
      {
        id: '1234',
        email: 'label@label.com',
        name: 'Giovane Lacerda',
        userId: 'exampleUserId',
        phone: '+55 (11) 99999-9999',
        created_at: expect.any(Date),
      },
      {
        id: '12345',
        email: 'label1@label.com',
        name: 'Gabriel Rodrigues',
        userId: 'exampleUserId',
        phone: '+55 (11) 99999-9999',
        created_at: expect.any(Date),
      },
    ])
  })
})