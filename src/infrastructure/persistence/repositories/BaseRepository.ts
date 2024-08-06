import { BaseEntity } from 'src/core/entities/BaseEntity'
import { IBaseRepository } from 'src/core/interfaces/repositories/IBaseRepository.interface'
import { Repository, FindOptionsWhere } from 'typeorm'

export type Predicate<TEntity> = (entity: TEntity) => boolean

export class BaseRepository<TEntity extends BaseEntity>
  implements IBaseRepository<TEntity>
{
  constructor(protected repository: Repository<TEntity>) {}

  async add(input: TEntity): Promise<void> {
    await this.repository.save(input)
  }

  async update(input: TEntity): Promise<void> {
    await this.repository.save({ id: input.id, ...input })
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById(id: string): Promise<TEntity> {
    return await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<TEntity>)
  }

  async findAll(): Promise<TEntity[]> {
    return await this.repository.find()
  }
}
