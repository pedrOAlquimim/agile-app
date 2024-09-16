import { Response } from 'express'
import { ICreateNewColumnUseCase } from 'src/core/interfaces/useCases/column/ICreateNewColumnUseCase.interface'
import { IDeleteColumnUseCase } from 'src/core/interfaces/useCases/column/IDeleteColumnUseCase.interface'
import { ISelectColumnByProjectUseCase } from 'src/core/interfaces/useCases/column/ISelectColumnByProjectUseCase.interface'
import { IUpdateColumnUseCase } from 'src/core/interfaces/useCases/column/IUpdateColumnUseCase.interface'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import {
  CreateNewColumnDTO,
  createNewColumnDTOSchema,
} from 'src/core/dtos/createNewColumn.dto'
import {
  UpdateColumnDTO,
  updateColumnDTOSchema,
} from 'src/core/dtos/updateColumn.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'

@Controller('api/column')
export class ColumnController {
  constructor(
    @Inject(ICreateNewColumnUseCase)
    private createNewColumnUseCase: ICreateNewColumnUseCase,

    @Inject(IDeleteColumnUseCase)
    private deleteColumnUseCase: IDeleteColumnUseCase,

    @Inject(ISelectColumnByProjectUseCase)
    private selectColumnByProjectUseCase: ISelectColumnByProjectUseCase,

    @Inject(IUpdateColumnUseCase)
    private updateColumnUseCase: IUpdateColumnUseCase,
  ) {}

  @Get(':projectId')
  async fetchColumnsByProjectId(
    @Param('projectId') projectId: string,
    @Res() response: Response,
  ) {
    const result = await this.selectColumnByProjectUseCase.execute(projectId)

    if (!result.success) return response.status(404).send(result)

    return response.status(200).send(result)
  }

  @Delete(':columnId')
  async deleteColumn(
    @Param('columnId') columnId: string,
    @Res() response: Response,
  ) {
    const result = await this.deleteColumnUseCase.execute(columnId)

    if (!result.success) return response.status(404).send(result)

    return response.status(204)
  }

  @Post()
  async createNewColumn(
    @Body(new ZodPipe(createNewColumnDTOSchema)) input: CreateNewColumnDTO,
    @Res() response: Response,
  ) {
    const result = await this.createNewColumnUseCase.execute(input)

    if (!result.success) return response.status(404).send(result)

    return response.status(201).send(result)
  }

  @Put()
  async updateColumn(
    @Body(new ZodPipe(updateColumnDTOSchema)) input: UpdateColumnDTO,
    @Res() response: Response,
  ) {
    const result = await this.updateColumnUseCase.execute(input)

    if (!result.success) return response.status(404).send(result)

    return response.status(200).send(result)
  }
}
