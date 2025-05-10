import { randomUUID } from 'crypto'
import { Project } from 'src/core/entities/Project.entity'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'

export class InMemoryProjectRepository implements IProjectRepository {
  public items: Project[] = []

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const projects = this.items.filter((item) =>
      item.projects_projectMembers.find(
        (item2) => item2.projectMember.userId === userId,
      ),
    )

    if (!projects) return null

    return projects
  }

  async getProjectById(projectId: string): Promise<Project> {
    const project = this.items.find((item) => item.id === projectId)

    if (!project) return null

    return project
  }

  async add(input: Project): Promise<Project> {
    const project: Project = {
      id: input.id ?? randomUUID(),
      title: input.title,
      column: input.column,
      created_at: input.created_at ?? new Date(),
      projects_projectMembers: input.projects_projectMembers,
    }

    this.items.push(project)

    return project
  }

  async updateData(input: Project): Promise<Project> {
    const projectIndex = this.items.findIndex((item) => item.id === input.id)

    if (projectIndex !== 1) return null

    const project: Project = {
      id: input.id,
      title: input.title,
      column: input.column,
      created_at: input.created_at,
      projects_projectMembers: input.projects_projectMembers,
    }

    this.items.splice(projectIndex, 1, project)

    return project
  }

  async deleteData(id: string): Promise<Project> {
    const project = this.items.find((item) => item.id === id)

    if (!project) return null

    this.items = this.items.filter((item) => item.id !== id)

    return project
  }

  async findById(id: string): Promise<Project> {
    const project = this.items.find((item) => item.id === id)

    if (!project) return null

    return project
  }

  async findAll(): Promise<Project[]> {
    return this.items
  }
}
