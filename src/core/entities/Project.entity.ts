import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Projects_ProjectMembers } from './Projects_ProjectMembers.entity'
import { ColumnCard } from './ColumnCard.entity'

@Entity('projects')
export class Project extends BaseEntity {
  @Column('varchar')
  title: string

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Projects_ProjectMembers, (p_pm) => p_pm.project)
  projects_projectMembers: Projects_ProjectMembers[]

  @OneToMany(() => ColumnCard, (column) => column.id)
  column: ColumnCard[]
}
