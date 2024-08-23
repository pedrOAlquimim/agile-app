import { DeleteResult } from 'typeorm'

export interface IBaseRepository<TEntity> {
  add: (input: TEntity) => Promise<TEntity>
  updateData: (input: TEntity) => Promise<TEntity>
  deleteData: (id: string) => Promise<DeleteResult>
  findById: (id: string) => Promise<TEntity>
  findAll: () => Promise<TEntity[]>
}
