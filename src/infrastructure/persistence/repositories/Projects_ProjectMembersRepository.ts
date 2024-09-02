import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { BaseRepository } from './BaseRepository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Projects_ProjectMembersRepository extends BaseRepository<Projects_ProjectMembers> {
  constructor() {
    super(Projects_ProjectMembers)
  }
}
