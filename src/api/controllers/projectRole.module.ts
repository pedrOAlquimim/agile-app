import { Module } from '@nestjs/common'
import { ProjectRoleController } from './projectRole.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectRolesRepository } from 'src/infrastructure/persistence/repositories/ProjectRolesRepository'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { JwtService } from '@nestjs/jwt'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'
import { ICreateNewRoleUseCase } from 'src/core/interfaces/useCases/projectRole/ICreateNewRoleUseCase.interface'
import { CreateNewRoleUseCase } from 'src/application/use-cases/projectRole/createNewRole.use-case'
import { GetAllRolesUseCase } from 'src/application/use-cases/projectRole/getAllRoles.use-case'
import { GetSpecifiedRoleUseCase } from 'src/application/use-cases/projectRole/getSpecifiedRole.use-case'
import { IGetAllRolesUseCase } from 'src/core/interfaces/useCases/projectRole/IGetAllRolesUseCase.interface'
import { IGetSpecifiedRoleUseCase } from 'src/core/interfaces/useCases/projectRole/IGetSpecifiedRoleUseCase.interface'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRolesRepository])],
  controllers: [ProjectRoleController],
  providers: [
    JwtGuard,
    JwtService,
    {
      provide: IProjectRolesRepository,
      useClass: ProjectRolesRepository,
    },
    {
      provide: ICreateNewRoleUseCase,
      useClass: CreateNewRoleUseCase,
    },
    {
      provide: IGetAllRolesUseCase,
      useClass: GetAllRolesUseCase,
    },
    {
      provide: IGetSpecifiedRoleUseCase,
      useClass: GetSpecifiedRoleUseCase,
    },
  ],
  exports: [
    {
      provide: ICreateNewRoleUseCase,
      useClass: CreateNewRoleUseCase,
    },
    {
      provide: IGetAllRolesUseCase,
      useClass: GetAllRolesUseCase,
    },
    {
      provide: IGetSpecifiedRoleUseCase,
      useClass: GetSpecifiedRoleUseCase,
    },
  ],
})
export class ProjectRoleModule {}
