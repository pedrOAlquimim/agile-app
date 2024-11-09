import { randomUUID } from 'crypto'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { IProjects_ProjectMembersRepository } from 'src/core/interfaces/repositories/IProjects_ProjectMembers.interface'

export class InMemoryProjectsProjectMemberRepository
  implements IProjects_ProjectMembersRepository
{
  public items: Projects_ProjectMembers[] = []

  async findAllByProjectMember(
    projectMember: ProjectMembers,
  ): Promise<Projects_ProjectMembers[]> {
    return this.items.filter((item) => item.projectMember === projectMember)
  }

  async add(input: Projects_ProjectMembers): Promise<Projects_ProjectMembers> {
    const projectProjectMember: Projects_ProjectMembers = {
      id: input.id ?? randomUUID(),
      project: input.project,
      projectMember: input.projectMember,
      role: input.role,
      created_at: input.created_at ?? new Date(),
    }

    this.items.push(projectProjectMember)

    return projectProjectMember
  }

  async updateData(
    input: Projects_ProjectMembers,
  ): Promise<Projects_ProjectMembers> {
    const projectProjectMemberIndex = this.items.findIndex(
      (item) => item.id === input.id,
    )

    if (projectProjectMemberIndex !== 1) return null

    const projectProjectMember: Projects_ProjectMembers = {
      id: input.id,
      project: input.project,
      projectMember: input.projectMember,
      role: input.role,
      created_at: input.created_at,
    }

    this.items.splice(projectProjectMemberIndex, 1, projectProjectMember)

    return projectProjectMember
  }

  async deleteData(id: string): Promise<Projects_ProjectMembers> {
    const projectProjectMember = this.items.find((item) => item.id === id)

    if (!projectProjectMember) return null

    this.items = this.items.filter((item) => item.id !== id)

    return projectProjectMember
  }

  async findById(id: string): Promise<Projects_ProjectMembers> {
    const projectProjectMember = this.items.find((item) => item.id === id)

    if (!projectProjectMember) return null

    return projectProjectMember
  }

  async findAll(): Promise<Projects_ProjectMembers[]> {
    return this.items
  }
}
