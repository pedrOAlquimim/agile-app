import { Module } from '@nestjs/common'
import { ProjectController } from './project.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectRepository } from 'src/infrastructure/persistence/repositories/ProjectRepository'
import { ProjectMembersRepository } from 'src/infrastructure/persistence/repositories/ProjectMembersRepository'
import { Projects_ProjectMembersRepository } from 'src/infrastructure/persistence/repositories/Projects_ProjectMembersRepository'
import { ProjectRolesRepository } from 'src/infrastructure/persistence/repositories/ProjectRolesRepository'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { JwtService } from '@nestjs/jwt'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { IProjectMembersRepository } from 'src/core/interfaces/repositories/IProjectMembersRepository.interface'
import { IProjects_ProjectMembersRepository } from 'src/core/interfaces/repositories/IProjects_ProjectMembers.interface'
import { IProjectRolesRepository } from 'src/core/interfaces/repositories/IProjectRolesRepository.interface'
import { IDeleteProjectUseCase } from 'src/core/interfaces/useCases/project/IDeleteProjectUseCase.interface'
import { DeleteProjectUseCase } from 'src/application/use-cases/project/deleteProject.use-case'
import { IGetProjectsByUserUseCase } from 'src/core/interfaces/useCases/project/IGetProjectsByUser.interface'
import { GetProjectsByUserUseCase } from 'src/application/use-cases/project/getProjectsByUser.use-case'
import { IUpdateProjectUseCase } from 'src/core/interfaces/useCases/project/IupdateProjectUseCse.interface'
import { UpdateProjectUseCase } from 'src/application/use-cases/project/updateProject.use-case'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      ProjectMembersRepository,
      Projects_ProjectMembersRepository,
      ProjectRolesRepository,
    ]),
  ],
  controllers: [ProjectController],
  providers: [
    JwtGuard,
    JwtService,
    {
      provide: IProjectRepository,
      useClass: ProjectRepository,
    },
    {
      provide: IProjectMembersRepository,
      useClass: ProjectMembersRepository,
    },
    {
      provide: IProjects_ProjectMembersRepository,
      useClass: Projects_ProjectMembersRepository,
    },
    {
      provide: IProjectRolesRepository,
      useClass: ProjectRolesRepository,
    },
    {
      provide: IDeleteProjectUseCase,
      useClass: DeleteProjectUseCase,
    },
    {
      provide: IGetProjectsByUserUseCase,
      useClass: GetProjectsByUserUseCase,
    },
    {
      provide: IUpdateProjectUseCase,
      useClass: UpdateProjectUseCase,
    },
  ],
  exports: [
    {
      provide: IDeleteProjectUseCase,
      useClass: DeleteProjectUseCase,
    },
    {
      provide: IGetProjectsByUserUseCase,
      useClass: GetProjectsByUserUseCase,
    },
    {
      provide: IUpdateProjectUseCase,
      useClass: UpdateProjectUseCase,
    },
  ],
})
export class ProjectModule {}
