import { Inject } from '@nestjs/common'
import { Project } from 'src/core/entities/Project.entity'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class DeleteProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(projectId: string) {
    try {
      const response = new CustomResponse<Project>()

      const existingProject = await this.projectRepository.findById(projectId)

      if (!existingProject) return response.addError(['Project does not exist'])

      await this.projectRepository.deleteData(existingProject.id)

      response.data = existingProject

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
