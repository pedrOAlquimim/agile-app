import { Inject, Injectable } from '@nestjs/common'
import { UpdateProjectDTOInput } from 'src/core/dtos/updateProjectInput.dto'
import { Project } from 'src/core/entities/Project.entity'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { IUpdateProjectUseCase } from 'src/core/interfaces/useCases/project/IupdateProjectUseCse.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class UpdateProjectUseCase implements IUpdateProjectUseCase {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(input: UpdateProjectDTOInput, projectId: string) {
    try {
      const response = new CustomResponse<Project>()

      const project = await this.projectRepository.findById(projectId)

      if (!project) return response.addError(['Project does not exist'])

      project.title = input.title

      await this.projectRepository.updateData(project)

      response.data = project

      return response
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
