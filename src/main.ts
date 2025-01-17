import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './@env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = env.PORT
  await app.listen(PORT, () =>
    console.log(`Running API in MODE: ${env.NODE_ENV} on POST: ${env.PORT}`),
  )
}
bootstrap()
