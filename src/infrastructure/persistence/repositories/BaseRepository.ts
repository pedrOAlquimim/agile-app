import dataSource from '../config/dataSource'
import { BaseEntity } from 'src/core/entities/BaseEntity'
import { IBaseRepository } from 'src/core/interfaces/repositories/IBaseRepository.interface'
import {
  Repository,
  FindOptionsWhere,
  EntityTarget,
  DeleteResult,
} from 'typeorm'

export abstract class BaseRepository<TEntity extends BaseEntity>
  extends Repository<TEntity>
  implements IBaseRepository<TEntity>
{
  constructor(entity: EntityTarget<TEntity>) {
    super(entity, dataSource.manager)
  }

  async add(input: TEntity): Promise<TEntity> {
    return await this.save(input)
  }

  async updateData(input: TEntity): Promise<TEntity> {
    const existingData = await this.findById(input.id)

    Object.assign(existingData, input)

    return await this.save(existingData)
  }

  async deleteData(id: string): Promise<DeleteResult> {
    return await this.delete(id)
  }

  async findById(id: string): Promise<TEntity> {
    return await this.findOneBy({
      id,
    } as FindOptionsWhere<TEntity>)
  }

  async findAll(): Promise<TEntity[]> {
    return await this.find()
  }
}
