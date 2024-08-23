import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './infrastructure/persistence/config/dataSource'
import { AuthModule } from './api/controllers/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
