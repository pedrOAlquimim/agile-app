import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['test', 'development', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET_PASSWORD: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⛔ Invalid enviroment variables', _env.error.format())
  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
