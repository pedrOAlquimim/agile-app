import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './infrastructure/persistence/config/dataSource'
import { AuthModule } from './api/controllers/auth.module'
import { ContactModule } from './api/controllers/contact.module'
import { ProjectRoleModule } from './api/controllers/projectRole.module'
import { ProjectModule } from './api/controllers/project.module'
import { ColumnModule } from './api/controllers/column.module'
import { CardModule } from './api/controllers/card.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ContactModule,
    ProjectRoleModule,
    ProjectModule,
    ProjectRoleModule,
    ColumnModule,
    CardModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
