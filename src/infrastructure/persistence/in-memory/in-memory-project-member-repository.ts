import { randomUUID } from 'crypto'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { IProjectMembersRepository } from 'src/core/interfaces/repositories/IProjectMembersRepository.interface'

export class InMemoryProjectMemberRepository
  implements IProjectMembersRepository
{
  public items: ProjectMembers[] = []

  async findByUserId(userId: string): Promise<ProjectMembers> {
    const projectMember = this.items.find((item) => item.userId === userId)

    if (!projectMember) return null

    return projectMember
  }

  async add(input: ProjectMembers): Promise<ProjectMembers> {
    const projectMember: ProjectMembers = {
      id: input.id ?? randomUUID(),
      userId: input.userId,
      projects_projectMembers: input.projects_projectMembers,
      created_at: input.created_at ?? new Date(),
    }

    this.items.push(projectMember)

    return projectMember
  }

  async updateData(input: ProjectMembers): Promise<ProjectMembers> {
    const projectMemberIndex = this.items.findIndex(
      (item) => item.id === input.id,
    )

    if (projectMemberIndex !== 1) return null

    const projectMember: ProjectMembers = {
      id: input.id,
      userId: input.userId,
      projects_projectMembers: input.projects_projectMembers,
      created_at: input.created_at,
    }

    this.items.splice(projectMemberIndex, 1, projectMember)

    return projectMember
  }

  async deleteData(id: string): Promise<ProjectMembers> {
    const projectMember = this.items.find((item) => item.id === id)

    if (!projectMember) return null

    this.items = this.items.filter((item) => item.id !== id)

    return projectMember
  }

  async findById(id: string): Promise<ProjectMembers> {
    const projectMember = this.items.find((item) => item.id === id)

    if (!projectMember) return null

    return projectMember
  }

  async findAll(): Promise<ProjectMembers[]> {
    return this.items
  }
}
