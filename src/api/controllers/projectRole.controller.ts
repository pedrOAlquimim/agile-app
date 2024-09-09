import { ICreateNewRoleUseCase } from 'src/core/interfaces/useCases/projectRole/ICreateNewRoleUseCase.interface'
import { IGetAllRolesUseCase } from 'src/core/interfaces/useCases/projectRole/IGetAllRolesUseCase.interface'
import { IGetSpecifiedRoleUseCase } from 'src/core/interfaces/useCases/projectRole/IGetSpecifiedRoleUseCase.interface'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { Response } from 'express'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import {
  AddProjectRoleDTOInput,
  addProjectRoleDTOInputSchema,
} from 'src/core/dtos/addProjectRoleInput.dto'
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'

@Controller('api/projectRole')
export class ProjectRoleController {
  constructor(
    @Inject(ICreateNewRoleUseCase)
    private createNewRoleUseCase: ICreateNewRoleUseCase,

    @Inject(IGetSpecifiedRoleUseCase)
    private getSpecifiedRoleUseCase: IGetSpecifiedRoleUseCase,

    @Inject(IGetAllRolesUseCase)
    private getAllRolesUseCase: IGetAllRolesUseCase,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createNewRole(
    @Body(new ZodPipe(addProjectRoleDTOInputSchema))
    input: AddProjectRoleDTOInput,
    @Res() response: Response,
  ) {
    const result = await this.createNewRoleUseCase.execute(input.roleName)

    if (!result.success) return response.status(409).send(result)

    return result
  }

  @UseGuards(JwtGuard)
  @Get(':roleName')
  async getByRoleName(@Param() roleName: string, @Res() response: Response) {
    const result = await this.getSpecifiedRoleUseCase.execute(roleName)

    if (!response) return response.status(404).send(result)

    return result
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllRoles() {
    const result = await this.getAllRolesUseCase.execute()
    return result
  }
}
