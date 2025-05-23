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
import { ICreateNewProjectUseCase } from 'src/core/interfaces/useCases/project/ICreateNewProjectUseCase.interface'
import { CreateNewProjectUseCase } from 'src/application/use-cases/project/createNewProject.use-case'
import { Project } from 'src/core/entities/Project.entity'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { ProjectRoles } from 'src/core/entities/ProjectRoles.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectMembers,
      Projects_ProjectMembers,
      ProjectRoles,
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
    {
      provide: ICreateNewProjectUseCase,
      useClass: CreateNewProjectUseCase,
    },
  ],
  exports: [
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
    {
      provide: ICreateNewProjectUseCase,
      useClass: CreateNewProjectUseCase,
    },
  ],
})
export class ProjectModule {}
