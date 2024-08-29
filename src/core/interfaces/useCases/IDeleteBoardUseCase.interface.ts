export interface IDeleteBoardUseCase {
  execute: (boardId: string) => Promise<void>
}

export const IDeleteBoardUseCase = Symbol('IDeleteBoardUseCase')
