import { InMemoryContactRepository } from 'src/infrastructure/persistence/in-memory/in-memory-contact-repository'
import { UpdateContactUseCase } from './updateContact.use-case'

describe('Update contact use case', () => {
  let sut: UpdateContactUseCase
  let inMemoryContactRepository: InMemoryContactRepository

  beforeEach(() => {
    inMemoryContactRepository = new InMemoryContactRepository()
    sut = new UpdateContactUseCase(inMemoryContactRepository)
  })

  it('should be able update a contact', async () => {
    await inMemoryContactRepository.add({
      id: '1234',
      email: 'label@label.com',
      name: 'Giovane Lacerda',
      userId: '123',
      phone: '+55 (11) 99999-9999',
      created_at: new Date(),
    })

    const { data, success } = await sut.execute('1234', {
      email: 'newLabel@label.com',
      name: 'Giovane Lacerda New',
      phone: '+55 (11) 99999-8888',
    })

    expect(success).toBe(true)
    expect(data).toEqual({
      id: '1234',
      email: 'newLabel@label.com',
      name: 'Giovane Lacerda New',
      userId: '123',
      phone: '+55 (11) 99999-8888',
      created_at: expect.any(Date),
    })
  })

  it('should not be able to update a contact', async () => {
    await inMemoryContactRepository.add({
      id: '1234',
      email: 'label@label.com',
      name: 'Giovane Lacerda',
      userId: '123',
      phone: '+55 (11) 99999-9999',
      created_at: new Date(),
    })

    const { errors, success } = await sut.execute('12', {
      email: 'newLabel@label.com',
      name: 'Giovane Lacerda New',
      phone: '+55 (11) 99999-8888',
    })

    expect(success).toBe(false)
    expect(errors).toEqual(['Contact does not exist'])
  })
})
