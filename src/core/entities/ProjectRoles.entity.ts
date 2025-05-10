import { Column, CreateDateColumn, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity('projectRoles')
export class ProjectRoles extends BaseEntity {
  @Column('varchar')
  role: string

  @CreateDateColumn()
  created_at: Date
}
