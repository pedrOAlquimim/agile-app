import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ICreateNewRoleUseCase } from 'src/core/interfaces/useCases/projectRole/ICreateNewRoleUseCase.interface';
import { IGetAllRolesUseCase } from 'src/core/interfaces/useCases/projectRole/IGetAllRolesUseCase.interface';
import { IGetSpecifiedRoleUseCase } from 'src/core/interfaces/useCases/projectRole/IGetSpecifiedRoleUseCase.interface';
import { ZodPipe } from '../utils/pipes/zodPipe.pipe';
import {
  AddProjectRoleDTOInput,
  addProjectRoleDTOInputSchema,
} from 'src/core/dtos/addProjectRoleInput.dto'

@Controller('api/projectRole')
export class ProjectRoleController {
  constructor(
    @Inject(ICreateNewRoleUseCase)
    private createNewRoleUseCase: ICreateNewRoleUseCase,

    @Inject(IGetSpecifiedRoleUseCase)
    private getSpecifiedRoleUseCase: IGetSpecifiedRoleUseCase,

    @Inject(IGetAllRolesUseCase)
    private getAllRolesUseCase: IGetAllRolesUseCase
  ) {}

  @Post()
  async createNewRole(
    @Body(new ZodPipe(addProjectRoleDTOInputSchema))
    input: AddProjectRoleDTOInput
  ) {
    
  }
}