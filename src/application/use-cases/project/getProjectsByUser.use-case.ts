import { Inject } from '@nestjs/common'
import { Project } from 'src/core/entities/Project.entity'
import { IProjectMembersRepository } from 'src/core/interfaces/repositories/IProjectMembersRepository.interface'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class GetProjectsByUserUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,

    @Inject(IProjectMembersRepository)
    private readonly projectMembersRepository: IProjectMembersRepository,
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

      response.data = []
      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
