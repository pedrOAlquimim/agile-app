import { IBaseRepository } from './IBaseRepository.interface'
import { Card } from 'src/core/entities/Card.entity'

export interface ICardRepository extends IBaseRepository<Card> {}

export const ICardRepository = Symbol('ICardRepository')
