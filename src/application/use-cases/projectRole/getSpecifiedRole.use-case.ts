import { Inject, Injectable } from '@nestjs/common'
import { ProjectRolesOutputDTO } from 'src/core/dtos/projectRolesOutput.dto'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class IGetSpecifiedRoleUseCase implements IGetSpecifiedRoleUseCase {
  constructor(
    @Inject(IProjectRolesRepository)
    private readonly projectRolesRepository: IProjectRolesRepository,
  ) {}

  async execute(roleName: string) {
    try {
      const response = new CustomResponse<ProjectRolesOutputDTO>()

      const role = await this.projectRolesRepository.findByRole(roleName)

      if (!role) return response.addError(['role does not exist'])

      const existedRole: ProjectRolesOutputDTO = {
        id: role.id,
        role: role.role,
      }

      response.data = existedRole

      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
