import { Inject } from '@nestjs/common'
import { ProjectRolesOutputDTO } from 'src/core/dtos/projectRolesOutput.dto'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'
import { IGetAllRolesUseCase } from 'src/core/interfaces/useCases/projectRole/IGetAllRolesUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

export class GetAllRolesUseCase implements IGetAllRolesUseCase {
  constructor(
    @Inject(IProjectRolesRepository)
    private readonly projectRepository: IProjectRolesRepository,
  ) {}

  async execute() {
    try {
      const response = new CustomResponse<ProjectRolesOutputDTO[]>()

      const roles = await this.projectRepository.findAll()

      const allRoles: ProjectRolesOutputDTO[] = [...roles]

      response.data = allRoles

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
