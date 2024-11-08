import { randomUUID } from 'crypto'
import { ProjectRoles } from 'src/core/entities/ProjectRoles.entity'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'

export class InMemoryProjectRoleRepository implements IProjectRolesRepository {
  public items: ProjectRoles[] = []

  async findByRole(role: string): Promise<ProjectRoles> {
    const projectRole = this.items.find((item) => item.role === role)

    if (!projectRole) return null

    return projectRole
  }

  async add(input: ProjectRoles): Promise<ProjectRoles> {
    const projectRole: ProjectRoles = {
      id: input.id ?? randomUUID(),
      role: input.role,
      created_at: new Date(),
    }

    this.items.push(projectRole)

    return projectRole
  }

  async updateData(input: ProjectRoles): Promise<ProjectRoles> {
    const projectRoleIndex = this.items.findIndex(
      (item) => item.id === input.id,
    )

    if (projectRoleIndex !== 1) return null

    const projectRoleUpdate: ProjectRoles = {
      id: input.id,
      role: input.role,
      created_at: input.created_at,
    }

    this.items.splice(projectRoleIndex, 1, projectRoleUpdate)

    return projectRoleUpdate
  }

  async deleteData(id: string): Promise<ProjectRoles> {
    const projectRole = this.items.find((item) => item.id === id)

    if (!projectRole) return null

    this.items = this.items.filter((item) => item.id !== id)

    return projectRole
  }

  async findById(id: string): Promise<ProjectRoles> {
    const projectRole = this.items.find((item) => item.id === id)

    if (!projectRole) return null

    return projectRole
  }

  async findAll(): Promise<ProjectRoles[]> {
    return this.items
  }
}
