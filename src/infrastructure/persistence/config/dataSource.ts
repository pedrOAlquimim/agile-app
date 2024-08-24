import { env } from 'src/@env'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: ['dist/core/entities/*.entity.js'],
  migrations: ['dist/infrastructure/persistence/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)
dataSource.initialize()
export default dataSource
