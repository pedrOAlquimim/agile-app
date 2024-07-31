import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { env } from './@env'
import ormConfig from './infrastructure/config/orm.config'
import ormConfigProd from './infrastructure/config/orm.config.prod'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
