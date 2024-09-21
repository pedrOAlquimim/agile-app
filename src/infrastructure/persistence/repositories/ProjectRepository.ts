import { Project } from 'src/core/entities/Project.entity'
import { BaseRepository } from './BaseRepository'
import { IProjectRepository } from 'src/core/interfaces/repositories/IProjectRepository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectRepository
  extends BaseRepository<Project>
  implements IProjectRepository
{
  constructor() {
    super(Project)
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return this.find({
      where: {
        projects_projectMembers: {
          projectMember: {
            userId: userId,
          },
        },
      },
      relations: [
        'projects_projectMembers',
        'projects_projectMembers.projectMember',
      ],
    })
  }

  async getProjectById(projectId: string): Promise<Project> {
    return await this.findOne({
      where: {
        id: projectId,
      },
      relations: ['projects_projectMembers.projectMember'],
    })
  }
}
