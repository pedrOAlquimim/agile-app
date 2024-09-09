import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './infrastructure/persistence/config/dataSource'
import { AuthModule } from './api/controllers/auth.module'
import { ContactModule } from './api/controllers/contact.module'
import { ProjectRoleModule } from './api/controllers/projectRole.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ContactModule,
    ProjectRoleModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
