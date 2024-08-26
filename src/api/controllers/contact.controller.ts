import { ICreateContactUseCase } from 'src/core/interfaces/useCases/ICreateContactUseCase.interface'
import { ZodPipe } from '../utils/pipes/zodPipe.pipe'
import { IGetContactsByUserUseCase } from 'src/core/interfaces/useCases/IGetContactsByUserUseCase.interface'
import { IDeleteContactUseCase } from 'src/core/interfaces/useCases/IDeleteContactUseCase.interface'
import { Response } from 'express'
import {
  UpdateContactDTOInput,
  updateContactDTOSchema,
} from 'src/core/dtos/updateContact.dto'
import {
  CreateContactDTOInput,
  createContactDTOSchema,
} from 'src/core/dtos/createContactInput.dto'
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
  UseGuards,
} from '@nestjs/common'
import { IUpdateContactUseCase } from 'src/core/interfaces/useCases/IUpdateContactUseCase.interface'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'

@Controller('api/contact')
export class ContactController {
  constructor(
    @Inject(ICreateContactUseCase)
    private readonly createContactUseCase: ICreateContactUseCase,

    @Inject(IGetContactsByUserUseCase)
    private readonly getContactsByUserUseCase: IGetContactsByUserUseCase,

    @Inject(IDeleteContactUseCase)
    private readonly deleteContactUseCase: IDeleteContactUseCase,

    @Inject(IUpdateContactUseCase)
    private readonly updateContactUseCase: IUpdateContactUseCase,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createNewContact(
    @Body(new ZodPipe(createContactDTOSchema))
    input: CreateContactDTOInput,
  ) {
    const response = await this.createContactUseCase.execute(input)
    return response
  }

  @UseGuards(JwtGuard)
  @Get(':userId')
  async getContactsByUserId(@Param() userId: string) {
    return await this.getContactsByUserUseCase.execute(userId)
  }

  @UseGuards(JwtGuard)
  @Delete(':contactId')
  async deleteContactById(
    @Param() contactId: string,
    @Res() response: Response,
  ) {
    const result = await this.deleteContactUseCase.execute(contactId)

    if (!result.success) return response.status(404).send(result)

    return response.status(204).send(result)
  }

  @UseGuards(JwtGuard)
  @Put(':contactId')
  async updateContact(
    @Param() contactId: string,
    @Body(new ZodPipe(updateContactDTOSchema)) input: UpdateContactDTOInput,
    @Res() response: Response,
  ) {
    const result = await this.updateContactUseCase.execute(contactId, input)

    if (!result.success) return response.status(404).send(result)

    return result
  }
}
