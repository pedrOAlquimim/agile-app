import { Test, TestingModule } from '@nestjs/testing'
import { ProjectController } from './project.controller'
import { CreateNewProjectUseCase } from '../../application/use-cases/project/createNewProject.use-case'
import { DeleteProjectUseCase } from '../../application/use-cases/project/deleteProject.use-case'
import { GetProjectsByUserUseCase } from '../../application/use-cases/project/getProjectsByUser.use-case'
import { UpdateProjectUseCase } from '../../application/use-cases/project/updateProject.use-case'
import { IDeleteProjectUseCase } from '../../core/interfaces/useCases/project/IDeleteProjectUseCase.interface'
import { IGetProjectsByUserUseCase } from '../../core/interfaces/useCases/project/IGetProjectsByUser.interface'
import { IUpdateProjectUseCase } from '../../core/interfaces/useCases/project/IupdateProjectUseCse.interface'
import { ICreateNewProjectUseCase } from '../../core/interfaces/useCases/project/ICreateNewProjectUseCase.interface'

describe('ProjectControllers', () => {
  let controller: ProjectController
  const mockCreateNewProjectUseCase = {
    execute: jest.fn(async (dto, userId) => {
      return {
        _success: true,
        _data: {
          id: expect.any(String),
          projects_projectMembers: [
            {
              id: expect.any(String),
              userId: userId,
              created_at: expect.any(Date),
            },
          ],
          ...dto,
        },
        _error: null,
        _message: null,
      }
    }),
  }
  const mockDeleteProjectUseCase = {}
  const mockGetProjectsByUserUseCase = {}
  const mockUpdateProjectUseCase = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        { provide: IDeleteProjectUseCase, useValue: DeleteProjectUseCase },
        {
          provide: IGetProjectsByUserUseCase,
          useValue: GetProjectsByUserUseCase,
        },
        {
          provide: ICreateNewProjectUseCase,
          useValue: CreateNewProjectUseCase,
        },
        { provide: IUpdateProjectUseCase, useValue: UpdateProjectUseCase },
      ],
    })
      .overrideProvider([
        IDeleteProjectUseCase,
        IGetProjectsByUserUseCase,
        ICreateNewProjectUseCase,
        IUpdateProjectUseCase,
      ])
      .useValue([
        mockDeleteProjectUseCase,
        mockGetProjectsByUserUseCase,
        mockCreateNewProjectUseCase,
        mockUpdateProjectUseCase,
      ])
      .compile()

    controller = module.get<ProjectController>(ProjectController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a new project', () => {
    expect(
      controller.createNewProject('fakeUserId', { title: 'fakeProject' }),
    ).toEqual({
      _success: true,
      _data: {
        id: expect.any(String),
        title: 'fakeProject',
        created_at: expect.any(Date),
        projects_projectMembers: [
          {
            id: expect.any(String),
            userId: 'fakeUserId',
            created_at: expect.any(Date),
          },
        ],
        column: expect.any(Array),
      },
      _error: null,
      _message: null,
    })

    expect(mockCreateNewProjectUseCase).toHaveBeenCalled()
  })
})
