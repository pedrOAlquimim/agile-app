import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './@env'
import { ZodFilter } from './api/utils/filters/zodFilter.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new ZodFilter())
  const PORT = env.PORT
  await app.listen(PORT, () =>
    console.log(`Running API in MODE: ${env.NODE_ENV} on POST: ${env.PORT}`),
  )
}
bootstrap()
