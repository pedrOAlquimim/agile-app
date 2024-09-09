import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateProjectInputDTO } from 'src/core/dtos/createProjectInput.dto'
import { Project } from 'src/core/entities/Project.entity'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { IProjectMembersRepository } from 'src/core/interfaces/repositories/IProjectMembersRepository.interface'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'
import { IProjects_ProjectMembersRepository } from 'src/core/interfaces/repositories/IProjects_ProjectMembers.interface'
import { ICreateNewProjectUseCase } from 'src/core/interfaces/useCases/project/ICreateNewProjectUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class CreateNewProjectUseCase implements ICreateNewProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,

    @Inject(IProjectMembersRepository)
    private readonly projectMemberRepository: IProjectMembersRepository,

    @Inject(IProjects_ProjectMembersRepository)
    private readonly projects_projectsMembersRepository: IProjects_ProjectMembersRepository,

    @Inject(IProjectRolesRepository)
    private readonly projectRoleRepository: IProjectRolesRepository,
  ) {}

  async execute(input: CreateProjectInputDTO, userId: string) {
    try {
      const response = new CustomResponse<Project>()

      const existingProjectMember =
        await this.projectMemberRepository.findByUserId(userId)

      const newProjectMember: ProjectMembers = {
        id: randomUUID(),
        created_at: new Date(),
        userId,
        projects_projectMembers: [],
      }

      const newProject: Project = {
        id: randomUUID(),
        created_at: new Date(),
        title: input.title,
        projects_projectMembers: [],
        column: [],
      }

      const role = await this.projectRoleRepository.findByRole('admin')

      const newProjects_ProjectMember: Projects_ProjectMembers = {
        id: randomUUID(),
        created_at: new Date(),
        project: newProject,
        projectMember: existingProjectMember
          ? existingProjectMember
          : newProjectMember,
        role: role,
      }

      if (existingProjectMember) {
        Promise.all([
          this.projectRepository.add(newProject),
          this.projects_projectsMembersRepository.add(
            newProjects_ProjectMember,
          ),
        ])
      }

      if (!existingProjectMember) {
        Promise.all([
          this.projectMemberRepository.add(newProjectMember),
          this.projectRepository.add(newProject),
          this.projects_projectsMembersRepository.add(
            newProjects_ProjectMember,
          ),
        ])
      }

      const project = await this.projectRepository.findById(newProject.id)

      const createdProject = {
        ...project,
      }

      response.data = createdProject

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
