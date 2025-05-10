import { randomUUID } from 'crypto'
import { Contact } from 'src/core/entities/Contact.entity'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'

export class InMemoryContactRepository implements IContactRepository {
  public items: Contact[] = []

  async findAllByUserId(userId: string): Promise<Contact[]> {
    return this.items.filter((item) => item.userId === userId)
  }

  async add(input: Contact): Promise<Contact> {
    const contact: Contact = {
      id: input.id ?? randomUUID(),
      email: input.email,
      name: input.name,
      phone: input.phone,
      userId: input.userId,
      created_at: input.created_at ?? new Date(),
    }

    this.items.push(contact)

    return contact
  }

  async updateData(input: Contact): Promise<Contact> {
    const contactIndex = this.items.findIndex((item) => item.id === input.id)

    if (contactIndex !== 1) return null

    const contact: Contact = {
      id: input.id,
      email: input.email,
      name: input.name,
      phone: input.phone,
      userId: input.userId,
      created_at: input.created_at,
    }

    this.items.splice(contactIndex, 1, contact)

    return contact
  }

  async deleteData(id: string): Promise<Contact> {
    const contact = this.items.find((item) => item.id === id)

    if (!contact) return null

    this.items = this.items.filter((item) => item.id !== id)

    return contact
  }

  async findById(id: string): Promise<Contact> {
    const contact = this.items.find((item) => item.id === id)

    if (!contact) return null

    return contact
  }

  async findAll(): Promise<Contact[]> {
    return this.items
  }
}
