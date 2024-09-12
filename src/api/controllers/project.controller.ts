import { ICreateNewProjectUseCase } from 'src/core/interfaces/useCases/project/ICreateNewProjectUseCase.interface'
import { IDeleteProjectUseCase } from 'src/core/interfaces/useCases/project/IDeleteProjectUseCase.interface'
import { IGetProjectsByUserUseCase } from 'src/core/interfaces/useCases/project/IGetProjectsByUser.interface'
import { IUpdateProjectUseCase } from 'src/core/interfaces/useCases/project/IupdateProjectUseCse.interface'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { Response } from 'express'
import {
  CreateProjectInputDTO,
  createProjectInputDTOSchema,
} from 'src/core/dtos/createProjectInput.dto'
import {
  UpdateProjectDTOInput,
  updateProjectDTOInputSchema,
} from 'src/core/dtos/updateProjectInput.dto'
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'

@Controller('api/project')
export class ProjectController {
  constructor(
    @Inject(ICreateNewProjectUseCase)
    private createNewProjectUseCase: ICreateNewProjectUseCase,

    @Inject(IDeleteProjectUseCase)
    private deleteProjectUseCase: IDeleteProjectUseCase,

    @Inject(IGetProjectsByUserUseCase)
    private getProjectsByUserUseCase: IGetProjectsByUserUseCase,

    @Inject(IUpdateProjectUseCase)
    private updateProjectUseCase: IUpdateProjectUseCase,
  ) {}

  @Post(':userId')
  async createNewProject(
    @Param() userId: string,
    @Body(new ZodPipe(createProjectInputDTOSchema))
    input: CreateProjectInputDTO,
  ) {
    const result = await this.createNewProjectUseCase.execute(input, userId)
    return result
  }

  @Delete(':projectId')
  async deleteProject(@Param() projectId: string, @Res() response: Response) {
    const result = await this.deleteProjectUseCase.execute(projectId)

    if (!result.success) return response.status(404).send(result)

    return result
  }

  @Put(':projectId')
  async updateProject(
    @Param() projectId: string,
    @Body(new ZodPipe(updateProjectDTOInputSchema))
    input: UpdateProjectDTOInput,
    @Res() response: Response,
  ) {
    const result = await this.updateProjectUseCase.execute(input, projectId)

    if (!result.success) return response.status(404).send(result)

    return result
  }
}