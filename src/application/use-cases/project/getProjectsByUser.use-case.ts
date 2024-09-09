import { Inject } from '@nestjs/common'
import { Project } from 'src/core/entities/Project.entity'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { IGetProjectsByUserUseCase } from 'src/core/interfaces/useCases/project/IGetProjectsByUser.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class GetProjectsByUserUseCase implements IGetProjectsByUserUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(userId: string) {
    try {
      const response = new CustomResponse<Project[]>()

      const projects = await this.projectRepository.getProjectsByUserId(userId)

      response.data = projects

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
