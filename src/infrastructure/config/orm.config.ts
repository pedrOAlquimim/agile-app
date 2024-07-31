import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { env } from 'src/@env'

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'postgres',
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: [],
    synchronize: true,
  }),
)
