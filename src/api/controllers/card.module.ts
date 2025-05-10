import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CardRepository } from 'src/infrastructure/persistence/repositories/CardRepository'
import { ColumnRepository } from 'src/infrastructure/persistence/repositories/ColumnRepository'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { JwtService } from '@nestjs/jwt'
import { ICardRepository } from 'src/core/interfaces/repositories/ICardRepository.interface'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { ChangeCardFromColumnUseCase } from 'src/application/use-cases/card/changeCardFromColumn.use-case'
import { IChangeCardFromColumnUseCase } from 'src/core/interfaces/useCases/card/IChangeCardFromColumnUseCase.interface'
import { ICreateNewCardUseCase } from 'src/core/interfaces/useCases/card/ICreateNewCardUseCase.interface'
import { CreateNewCardUseCase } from 'src/application/use-cases/card/createNewCard.use-case'
import { IDeleteCardUseCase } from 'src/core/interfaces/useCases/card/IDeleteCardUseCase.interface'
import { DeleteCardUseCase } from 'src/application/use-cases/card/deleteCard.use-case'
import { IFetchCardByColumnUseCase } from 'src/core/interfaces/useCases/card/IFetchCardByColumnUseCase.interface'
import { FetchCardByColumnUseCase } from 'src/application/use-cases/card/fetchCardByColumn.use-case'
import { IUpdateCardUseCase } from 'src/core/interfaces/useCases/card/IUpdateCardUseCase.interface'
import { UpdateCardUseCase } from 'src/application/use-cases/card/updateCard.use-case'
import { CardController } from './card.controller'
import { Card } from 'src/core/entities/Card.entity'
import { Column } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Card, Column])],
  controllers: [CardController],
  providers: [
    JwtGuard,
    JwtService,
    {
      provide: ICardRepository,
      useClass: CardRepository,
    },
    {
      provide: IColumnRepository,
      useClass: ColumnRepository,
    },
    {
      provide: IChangeCardFromColumnUseCase,
      useClass: ChangeCardFromColumnUseCase,
    },
    {
      provide: ICreateNewCardUseCase,
      useClass: CreateNewCardUseCase,
    },
    {
      provide: IDeleteCardUseCase,
      useClass: DeleteCardUseCase,
    },
    {
      provide: IFetchCardByColumnUseCase,
      useClass: FetchCardByColumnUseCase,
    },
    {
      provide: IUpdateCardUseCase,
      useClass: UpdateCardUseCase,
    },
  ],
  exports: [
    {
      provide: ICardRepository,
      useClass: CardRepository,
    },
    {
      provide: IColumnRepository,
      useClass: ColumnRepository,
    },
    {
      provide: IChangeCardFromColumnUseCase,
      useClass: ChangeCardFromColumnUseCase,
    },
    {
      provide: ICreateNewCardUseCase,
      useClass: CreateNewCardUseCase,
    },
    {
      provide: IDeleteCardUseCase,
      useClass: DeleteCardUseCase,
    },
    {
      provide: IFetchCardByColumnUseCase,
      useClass: FetchCardByColumnUseCase,
    },
    {
      provide: IUpdateCardUseCase,
      useClass: UpdateCardUseCase,
    },
  ],
})
export class CardModule {}
