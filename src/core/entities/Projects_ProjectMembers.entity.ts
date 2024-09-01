import { CreateDateColumn, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { ProjectMembers } from './ProjectMembers.entity'
import { Project } from './Project.entity'
import { ProjectRoles } from './ProjectRoles.entity'

@Entity('projects_projectMembers')
export class Projects_ProjectMembers extends BaseEntity {
  @CreateDateColumn()
  created_at: Date

  @ManyToOne(
    () => ProjectMembers,
    (projectMember) => projectMember.projects_projectMembers,
  )
  projectMember: ProjectMembers

  @ManyToOne(() => Project, (project) => project.projects_projectMembers)
  project: Project

  @ManyToOne(() => ProjectRoles, (role) => role.id)
  role: ProjectRoles
}
