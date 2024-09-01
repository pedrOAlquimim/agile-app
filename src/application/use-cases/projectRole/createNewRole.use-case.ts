import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'
import { ICreateNewRoleUseCase } from 'src/core/interfaces/useCases/projectRole/ICreateNewRoleUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class CreateNewRoleUseCase implements ICreateNewRoleUseCase {
  constructor(
    @Inject(IProjectRolesRepository)
    private readonly projectRoleRepository: IProjectRolesRepository,
  ) {}

  async execute(roleName: string) {
    try {
      const response = new CustomResponse<void>()

      const role = await this.projectRoleRepository.findByRole(roleName)

      if (role) return response.addError(['role already exist'])

      const newRole = {
        id: randomUUID(),
        role: roleName,
        created_at: new Date(),
      }
      await this.projectRoleRepository.add(newRole)
    } catch (ex) {
      throw new Error(ex.message)
    }
  }
}
