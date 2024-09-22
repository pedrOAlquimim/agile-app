import { Test, TestingModule } from '@nestjs/testing'
import { ProjectController } from './project.controller'
import { GetProjectsByUserUseCase } from '../../application/use-cases/project/getProjectsByUser.use-case'
import { IDeleteProjectUseCase } from '../../core/interfaces/useCases/project/IDeleteProjectUseCase.interface'
import { IGetProjectsByUserUseCase } from '../../core/interfaces/useCases/project/IGetProjectsByUser.interface'
import { IUpdateProjectUseCase } from '../../core/interfaces/useCases/project/IupdateProjectUseCse.interface'
import { ICreateNewProjectUseCase } from '../../core/interfaces/useCases/project/ICreateNewProjectUseCase.interface'
import { Response } from 'express'

describe('ProjectControllers', () => {
  let controller: ProjectController

  const statusResponseMock = {
    send: jest.fn((x) => x),
  }

  const responseMock = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response

  const mockCreateNewProjectUseCase = {
    execute: jest.fn((dto, userId: string) => {
      return {
        _success: true,
        _data: {
          ...dto,
          id: expect.any(String),
          created_at: expect.any(Date),
          projects_projectMembers: [
            {
              id: expect.any(String),
              created_at: expect.any(Date),
              projectMember: {
                id: expect.any(String),
                userId,
                created_at: expect.any(Date),
              },
            },
          ],
          column: expect.any(Array),
        },
      }
    }),
  }
  const mockUpdateProjectUseCase = {
    execute: jest.fn().mockImplementation((dto, projectId: string) => {
      if (!projectId) {
        return {
          _success: false,
          _data: null,
          _errors: ['Project does not exist'],
        }
      }

      return {
        _success: true,
        _data: {
          ...dto,
          id: projectId,
          created_at: expect.any(Date),
        },
      }
    }),
  }

  const mockDeleteProjectUseCase = {
    execute: jest.fn().mockImplementation((projectId: string) => {
      if (!projectId) {
        return {
          _success: false,
          _data: null,
          _errors: ['Project does not exist'],
        }
      }

      return {
        _success: true,
        _data: {
          id: projectId,
          title: expect.any(String),
          created_at: expect.any(Date),
        },
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        { provide: IDeleteProjectUseCase, useValue: mockDeleteProjectUseCase },
        {
          provide: IGetProjectsByUserUseCase,
          useValue: GetProjectsByUserUseCase,
        },
        {
          provide: ICreateNewProjectUseCase,
          useValue: mockCreateNewProjectUseCase,
        },
        { provide: IUpdateProjectUseCase, useValue: mockUpdateProjectUseCase },
      ],
    }).compile()

    controller = module.get<ProjectController>(ProjectController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a new project', async () => {
    await controller.createNewProject(
      'fakeUserId',
      { title: 'fakeProject' },
      responseMock,
    )
    expect(responseMock.status).toHaveBeenCalledWith(201)
    expect(statusResponseMock.send).toHaveBeenLastCalledWith({
      _success: true,
      _data: {
        id: expect.any(String),
        title: 'fakeProject',
        created_at: expect.any(Date),
        projects_projectMembers: [
          {
            id: expect.any(String),
            created_at: expect.any(Date),
            projectMember: {
              id: expect.any(String),
              userId: 'fakeUserId',
              created_at: expect.any(Date),
            },
          },
        ],
        column: expect.any(Array),
      },
    })

    expect(mockCreateNewProjectUseCase.execute).toHaveBeenCalledWith(
      { title: 'fakeProject' },
      'fakeUserId',
    )
  })

  it('should update a project', async () => {
    await controller.updateProject(
      'projectId',
      { title: 'updateTitle' },
      responseMock,
    )

    expect(responseMock.status).toHaveBeenCalledWith(201)
    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: true,
      _data: {
        id: 'projectId',
        title: 'updateTitle',
        created_at: expect.any(Date),
      },
    })
    expect(mockUpdateProjectUseCase.execute).toHaveBeenCalled()
  })

  it('should return 404 when trying to update a project with wrong projectId', async () => {
    await controller.updateProject('', { title: 'updateTitle' }, responseMock)

    expect(responseMock.status).toHaveBeenCalledWith(404)
    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: false,
      _data: null,
      _errors: ['Project does not exist'],
    })
    expect(mockUpdateProjectUseCase.execute).toHaveBeenCalled()
  })

  it('should delete a project', async () => {
    await controller.deleteProject('projectId', responseMock)

    expect(responseMock.status).toHaveBeenCalledWith(201)
    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: true,
      _data: {
        id: 'projectId',
        title: expect.any(String),
        created_at: expect.any(Date),
      },
    })
    expect(mockDeleteProjectUseCase.execute).toHaveBeenCalled()
  })

  it('should return 404 when trying to delete with wrong projectId', async () => {
    await controller.deleteProject('', responseMock)

    expect(responseMock.status).toHaveBeenCalledWith(404)
    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: false,
      _data: null,
      _errors: ['Project does not exist'],
    })
    expect(mockDeleteProjectUseCase.execute).toHaveBeenCalled()
  })
})
