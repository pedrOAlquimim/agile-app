import { BoardDTO } from 'src/core/dtos/board.dto'
import { CreateBoardInputDTOInput } from 'src/core/dtos/createBoardInput.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface ICreateBoardUseCase {
  execute: (
    input: CreateBoardInputDTOInput,
  ) => Promise<CustomResponse<BoardDTO>>
}

export const ICreateBoardUseCase = Symbol('ICreateBoardUseCase')
