import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './@env'
import { ZodFilter } from './api/utils/filters/zodFilter.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new ZodFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  const PORT = env.PORT
  await app.listen(PORT, () =>
    console.log(`Running API in MODE: ${env.NODE_ENV} on POST: ${env.PORT}`),
  )
}
bootstrap()
