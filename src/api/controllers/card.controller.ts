import { IChangeCardFromColumnUseCase } from 'src/core/interfaces/useCases/card/IChangeCardFromColumnUseCase.interface'
import { ICreateNewCardUseCase } from 'src/core/interfaces/useCases/card/ICreateNewCardUseCase.interface'
import { IDeleteCardUseCase } from 'src/core/interfaces/useCases/card/IDeleteCardUseCase.interface'
import { IFetchCardByColumnUseCase } from 'src/core/interfaces/useCases/card/IFetchCardByColumnUseCase.interface'
import { IUpdateCardUseCase } from 'src/core/interfaces/useCases/card/IUpdateCardUseCase.interface'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { Response } from 'express'
import {
  UpdateCardDTOInput,
  updateCardDTOInputSchema,
} from 'src/core/dtos/updateCardInput.dto'
import {
  CreateNewCardDTOInput,
  createNewCardDTOInputSchema,
} from 'src/core/dtos/createNewCardInput.interface'
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
import {
  ChangeCardFromColumnDTOInput,
  changeCardFromColumnDTOInputSchema,
} from 'src/core/dtos/changeCardFromColumnInput.dto'

@Controller('api/card')
export class CardController {
  constructor(
    @Inject(IChangeCardFromColumnUseCase)
    private changeCardFromColumnUseCase: IChangeCardFromColumnUseCase,

    @Inject(ICreateNewCardUseCase)
    private createNewCardUseCase: ICreateNewCardUseCase,

    @Inject(IDeleteCardUseCase)
    private deleteCardUseCase: IDeleteCardUseCase,

    @Inject(IFetchCardByColumnUseCase)
    private fetchCardByColumnUseCase: IFetchCardByColumnUseCase,

    @Inject(IUpdateCardUseCase)
    private updateCardUseCase: IUpdateCardUseCase,
  ) {}

  @Get('fetchCardByColumn/:columnId')
  async fetchCardByColumn(
    @Param('columnId') columnId: string,
    @Res() response: Response,
  ) {
    const result = await this.fetchCardByColumnUseCase.execute(columnId)

    if (!result.success) return response.status(404).send(result)

    return response.status(200).send(result)
  }

  @Post()
  async createNewCard(
    @Body(new ZodPipe(createNewCardDTOInputSchema))
    input: CreateNewCardDTOInput,
    @Res() response: Response,
  ) {
    const result = await this.createNewCardUseCase.execute(input)

    if (!result.success) return response.status(404).send(result)

    return response.status(201).send(result)
  }

  @Delete(':columnId')
  async deleteCard(
    @Param('columnId') columnId: string,
    @Res() response: Response,
  ) {
    const result = await this.deleteCardUseCase.execute(columnId)

    if (!result.success) return response.status(404).send(result)

    return response.status(204)
  }

  @Put()
  async updateCard(
    @Body(new ZodPipe(updateCardDTOInputSchema))
    input: UpdateCardDTOInput,
    @Res() response: Response,
  ) {
    const result = await this.updateCardUseCase.execute(input)

    if (!result.success) return response.status(404).send(result)

    return response.status(201).send(result)
  }

  @Put('changeCardFromColumn')
  async changeCardFromColumn(
    @Body(new ZodPipe(changeCardFromColumnDTOInputSchema))
    input: ChangeCardFromColumnDTOInput,
    @Res() response: Response,
  ) {
    const result = await this.changeCardFromColumnUseCase.execute(input)

    return response.status(201).send(result)
  }
}
