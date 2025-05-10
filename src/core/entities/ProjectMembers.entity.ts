import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Projects_ProjectMembers } from './Projects_ProjectMembers.entity'

@Entity('projectMembers')
export class ProjectMembers extends BaseEntity {
  @Column('uuid')
  userId: string

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Projects_ProjectMembers, (p_pm) => p_pm.projectMember)
  projects_projectMembers: Projects_ProjectMembers[]
}
