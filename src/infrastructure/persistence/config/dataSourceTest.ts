import { Card } from 'src/core/entities/Card.entity'
import { ColumnCard } from 'src/core/entities/ColumnCard.entity'
import { Contact } from 'src/core/entities/Contact.entity'
import { Project } from 'src/core/entities/Project.entity'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { ProjectRoles } from 'src/core/entities/ProjectRoles.entity'
import { Projects_ProjectMembers } from 'src/core/entities/Projects_ProjectMembers.entity'
import { User } from 'src/core/entities/User.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

export const sqliteTestDbConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'test/database/testDb.sqlite',
  entities: [
    Card,
    ColumnCard,
    Contact,
    Project,
    ProjectMembers,
    ProjectRoles,
    Projects_ProjectMembers,
    User,
  ],
  synchronize: true,
}

export const dataSourceTest = new DataSource(sqliteTestDbConfig)
