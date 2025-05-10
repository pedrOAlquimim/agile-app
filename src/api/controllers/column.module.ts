import { Module } from '@nestjs/common'
import { ColumnController } from './column.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ColumnRepository } from 'src/infrastructure/persistence/repositories/ColumnRepository'
import { ProjectRepository } from 'src/infrastructure/persistence/repositories/ProjectRepository'
import { ICreateNewColumnUseCase } from 'src/core/interfaces/useCases/column/ICreateNewColumnUseCase.interface'
import { CreateNewColumnUseCase } from 'src/application/use-cases/columns/createNewColumn.use-case'
import { IDeleteColumnUseCase } from 'src/core/interfaces/useCases/column/IDeleteColumnUseCase.interface'
import { DeleteColumnUseCase } from 'src/application/use-cases/columns/deleteColumn.use-case'
import { ISelectColumnByProjectUseCase } from 'src/core/interfaces/useCases/column/ISelectColumnByProjectUseCase.interface'
import { IUpdateColumnUseCase } from 'src/core/interfaces/useCases/column/IUpdateColumnUseCase.interface'
import { UpdateColumnUseCase } from 'src/application/use-cases/columns/updateColumn.use-case'
import { SelectColumnsByProjectUseCase } from 'src/application/use-cases/columns/selectColumnsByProject.use-case'
import { IColumnRepository } from 'src/core/interfaces/repositories/IColumnRepository.interface'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { JwtService } from '@nestjs/jwt'
import { Column } from 'typeorm'
import { Project } from 'src/core/entities/Project.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Column, Project])],
  controllers: [ColumnController],
  providers: [
    JwtGuard,
    JwtService,
    {
      provide: IColumnRepository,
      useClass: ColumnRepository,
    },
    {
      provide: IProjectRepository,
      useClass: ProjectRepository,
    },
    {
      provide: ICreateNewColumnUseCase,
      useClass: CreateNewColumnUseCase,
    },
    {
      provide: IDeleteColumnUseCase,
      useClass: DeleteColumnUseCase,
    },
    {
      provide: ISelectColumnByProjectUseCase,
      useClass: SelectColumnsByProjectUseCase,
    },
    {
      provide: IUpdateColumnUseCase,
      useClass: UpdateColumnUseCase,
    },
  ],
  exports: [
    {
      provide: IColumnRepository,
      useClass: ColumnRepository,
    },
    {
      provide: IProjectRepository,
      useClass: ProjectRepository,
    },
    {
      provide: ICreateNewColumnUseCase,
      useClass: CreateNewColumnUseCase,
    },
    {
      provide: IDeleteColumnUseCase,
      useClass: DeleteColumnUseCase,
    },
    {
      provide: ISelectColumnByProjectUseCase,
      useClass: SelectColumnsByProjectUseCase,
    },
    {
      provide: IUpdateColumnUseCase,
      useClass: UpdateColumnUseCase,
    },
  ],
})
export class ColumnModule {}
