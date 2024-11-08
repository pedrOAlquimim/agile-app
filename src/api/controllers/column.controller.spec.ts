import { Test, TestingModule } from '@nestjs/testing'
import { ColumnController } from './column.controller'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { JwtService } from '@nestjs/jwt'
import { ISelectColumnByProjectUseCase } from 'src/core/interfaces/useCases/column/ISelectColumnByProjectUseCase.interface'
import { IDeleteColumnUseCase } from 'src/core/interfaces/useCases/column/IDeleteColumnUseCase.interface'
import { ICreateNewColumnUseCase } from 'src/core/interfaces/useCases/column/ICreateNewColumnUseCase.interface'
import { IUpdateColumnUseCase } from 'src/core/interfaces/useCases/column/IUpdateColumnUseCase.interface'
import { Response } from 'express'
import { CreateNewColumnDTO } from 'src/core/dtos/createNewColumn.dto'
import { UpdateColumnDTO } from 'src/core/dtos/updateColumn.dto'

describe('ColumnController', () => {
  let controller: ColumnController

  const statusResponseMock = {
    send: jest.fn((x) => x),
  }

  const responseMock = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response

  const mockSelectColumnByProjectUseCase = {
    execute: jest.fn((projectId: string) => {
      if (!projectId) {
        return {
          _success: false,
          _data: null,
          _errors: ['Project does not exist'],
        }
      }

      return {
        _success: true,
        _data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            project: expect.objectContaining({
              id: projectId,
            }),
          }),
        ]),
      }
    }),
  }

  const mockDeleteColumnUseCase = {
    execute: jest.fn((columnToDelete: string) => {
      if (!columnToDelete) {
        return {
          _success: false,
          _data: null,
          _errors: ['Project does not exist'],
        }
      }
    }),
  }

  const mockCreateNewColumnUseCase = {
    execute: jest.fn((model: CreateNewColumnDTO) => {
      if (!model || !model.projectId) {
        return {
          _success: false,
          _data: null,
          _errors: ['Project does not exist'],
        }
      }

      return {
        _success: true,
        _data: expect.objectContaining({
          id: expect.any(String),
          title: model.title,
          project: expect.objectContaining({
            id: model.projectId,
          }),
        }),
      }
    }),
  }

  const mockUpdateColumnUseCase = {
    execute: jest.fn((model: UpdateColumnDTO) => {
      if (!model || !model.id) {
        return {
          _success: false,
          _data: null,
          _errors: ['Column does not exist'],
        }
      }

      return {
        _success: true,
        _data: expect.objectContaining({
          id: model.id,
          title: model.title,
        }),
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColumnController],
      providers: [
        JwtGuard,
        JwtService,
        {
          provide: ISelectColumnByProjectUseCase,
          useValue: mockSelectColumnByProjectUseCase,
        },
        {
          provide: IDeleteColumnUseCase,
          useValue: mockDeleteColumnUseCase,
        },
        {
          provide: ICreateNewColumnUseCase,
          useValue: mockCreateNewColumnUseCase,
        },
        {
          provide: IUpdateColumnUseCase,
          useValue: mockUpdateColumnUseCase,
        },
      ],
    }).compile()

    controller = module.get<ColumnController>(ColumnController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should be able to select columns by project', async () => {
    const param = '92d1e526-5400-4def-b548-6357dc4143d5'
    await controller.fetchColumnsByProjectId(param, responseMock)

    expect(mockSelectColumnByProjectUseCase.execute).toHaveBeenCalledWith(param)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: true,
      _data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          project: expect.objectContaining({
            id: param,
          }),
        }),
      ]),
    })
  })

  it('should not be able to select columns by project', async () => {
    const param = ''
    await controller.fetchColumnsByProjectId(param, responseMock)

    expect(mockSelectColumnByProjectUseCase.execute).toHaveBeenCalledWith(param)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: false,
      _data: null,
      _errors: ['Project does not exist'],
    })

    expect(responseMock.status).toHaveBeenCalledWith(404)
  })

  // it('should delete a column', async () => {
  //   const param = 'columnId'
  //   await controller.deleteColumn(param, responseMock)

  //   expect(mockDeleteColumnUseCase.execute).toHaveBeenCalledWith(param)

  //   expect(statusResponseMock.send).toHaveBeenCalled()
  // })

  it('should create a new column', async () => {
    const input = {
      title: 'column',
      projectId: 'projectId',
    }

    await controller.createNewColumn(input, responseMock)

    expect(mockCreateNewColumnUseCase.execute).toHaveBeenCalledWith(input)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: true,
      _data: expect.objectContaining({
        id: expect.any(String),
        title: input.title,
        project: expect.objectContaining({
          id: input.projectId,
        }),
      }),
    })
  })

  it('should return error when does not have projectId to create a new column', async () => {
    const input = {
      title: 'column',
      projectId: '',
    }

    await controller.createNewColumn(input, responseMock)

    expect(mockCreateNewColumnUseCase.execute).toHaveBeenCalledWith(input)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: false,
      _data: null,
      _errors: ['Project does not exist'],
    })
  })

  it('should update a column title', async () => {
    const input = {
      id: 'teste',
      title: 'new column name',
    }

    await controller.updateColumn(input, responseMock)

    expect(mockUpdateColumnUseCase.execute).toHaveBeenCalledWith(input)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: true,
      _data: expect.objectContaining({
        id: input.id,
        title: input.title,
      }),
    })
  })

  it('should not update a column title with there is not an id', async () => {
    const input = {
      id: '',
      title: 'new column name',
    }

    await controller.updateColumn(input, responseMock)

    expect(mockUpdateColumnUseCase.execute).toHaveBeenCalledWith(input)

    expect(statusResponseMock.send).toHaveBeenCalledWith({
      _success: false,
      _data: null,
      _errors: ['Column does not exist'],
    })
  })
})
