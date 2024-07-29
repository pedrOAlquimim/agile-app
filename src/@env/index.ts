import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['test', 'development', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⛔ Invalid enviroment variables', _env.error.format())
  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
