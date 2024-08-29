import { BoardDTO } from 'src/core/dtos/board.dto'
import { UpdateBoardDTO } from 'src/core/dtos/updateBoardInput.dto'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IUpdateBoardUseCase {
  execute: (input: UpdateBoardDTO) => Promise<CustomResponse<BoardDTO>>
}

export const IUpdateBoardUseCase = Symbol('IUpdateBoardUseCase')
