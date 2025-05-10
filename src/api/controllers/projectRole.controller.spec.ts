import { Test, TestingModule } from '@nestjs/testing'
import { ICreateNewRoleUseCase } from 'src/core/interfaces/useCases/projectRole/ICreateNewRoleUseCase.interface'
import { IGetAllRolesUseCase } from 'src/core/interfaces/useCases/projectRole/IGetAllRolesUseCase.interface'
import { IGetSpecifiedRoleUseCase } from 'src/core/interfaces/useCases/projectRole/IGetSpecifiedRoleUseCase.interface'
import { ProjectRoleController } from './projectRole.controller'
import { Response } from 'express'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { JwtService } from '@nestjs/jwt'

describe('ProjectRoleController', () => {
  let controller: ProjectRoleController

  const statusResponseMock = {
    send: jest.fn((x) => x),
  }

  const responseMock = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response

  const mockCreateNewRoleUseCase = {
    execute: jest.fn().mockImplementation((role: string) => {
      if (role) {
        return {
          _success: true,
          _data: null,
        }
      }
    }),
  }

  const mockGetSpecifiedRoleUseCase = {
    execute: jest.fn((role: string) => {
      if (!role) {
        return {
          _success: false,
          _data: null,
          _errors: ['role does not exist'],
        }
      }

      return {
        _success: true,
        _data: {
          id: expect.any(String),
          role,
        },
      }
    }),
  }

  const mockGetAllRolesUseCase = {
    execute: jest.fn(() => {
      return {
        _success: true,
        _data: [
          {
            id: expect.any(String),
            role: expect.any(String),
          },
          {
            id: expect.any(String),
            role: expect.any(String),
          },
        ],
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectRoleController],
      providers: [
        JwtGuard,
        JwtService,
        { provide: ICreateNewRoleUseCase, useValue: mockCreateNewRoleUseCase },
        { provide: IGetAllRolesUseCase, useValue: mockGetAllRolesUseCase },
        {
          provide: IGetSpecifiedRoleUseCase,
          useValue: mockGetSpecifiedRoleUseCase,
        },
      ],
    }).compile()

    controller = module.get<ProjectRoleController>(ProjectRoleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a new role', async () => {
    const dto = { roleName: 'role' }
    await controller.createNewRole(dto, responseMock)
    expect(mockCreateNewRoleUseCase.execute).toHaveBeenCalledWith(dto.roleName)

    expect(statusResponseMock.send).toHaveBeenCalled()
  })

  it("shouldn't get role by name", async () => {
    const param = ''
    await controller.getByRoleName(param, responseMock)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: false,
      _data: null,
      _errors: ['role does not exist'],
    })

    expect(mockGetSpecifiedRoleUseCase.execute).toHaveBeenCalledWith(param)
  })

  it('should get role by name', async () => {
    const param = 'roleExemple'
    await controller.getByRoleName(param, responseMock)

    expect(statusResponseMock.send).toHaveReturnedWith({
      _success: true,
      _data: {
        id: expect.any(String),
        role: param,
      },
    })
    expect(mockGetSpecifiedRoleUseCase.execute).toHaveBeenCalledWith(param)
  })

  it('should return all roles', async () => {
    await controller.getAllRoles(responseMock)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: true,
      _data: expect.arrayContaining([
        {
          id: expect.any(String),
          role: expect.any(String),
        },
      ]),
    })

    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(mockGetAllRolesUseCase.execute).toHaveBeenCalled()
  })
})
