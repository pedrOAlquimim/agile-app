export interface IBaseRepository<TEntity> {
  add: (input: TEntity) => Promise<void>
  update: (input: TEntity) => Promise<void>
  delete: (id: string) => Promise<void>
  findById: (id: string) => Promise<TEntity>
  findAll: () => Promise<TEntity[]>
}
