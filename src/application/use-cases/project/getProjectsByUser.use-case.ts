import { Inject } from '@nestjs/common'
import { Project } from 'src/core/entities/Project.entity'
import { IProjectMembersRepository } from 'src/core/interfaces/repositories/IProjectMembersRepository.interface'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { IProjects_ProjectMembersRepository } from 'src/core/interfaces/repositories/IProjects_ProjectMembers.interface'
import { IGetProjectsByUserUseCase } from 'src/core/interfaces/useCases/project/IGetProjectsByUser.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class GetProjectsByUserUseCase implements IGetProjectsByUserUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,

    @Inject(IProjectMembersRepository)
    private readonly projectMembersRepository: IProjectMembersRepository,

    @Inject(IProjects_ProjectMembersRepository)
    private readonly projects_projectMembersRepository: IProjects_ProjectMembersRepository,
  ) {}

  async execute(userId: string) {
    try {
      const response = new CustomResponse<Project[]>()

      const projectMember =
        await this.projectMembersRepository.findByUserId(userId)

      if (!projectMember) {
        response.data = []
        return response
      }

      const project_projectMember =
        await this.projects_projectMembersRepository.findAllByProjectMember(
          projectMember,
        )

      if (project_projectMember.length === 0) {
        response.data = []
        return response
      }

      const projects = await this.projectRepository.findAllByOneMember()

      response.data = []
      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
