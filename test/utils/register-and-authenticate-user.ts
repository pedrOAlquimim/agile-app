import * as request from 'supertest'
import { UserRepository } from 'src/infrastructure/persistence/repositories/UserRepository'
import { AuthenticateDTO } from 'src/core/dtos/authenticateUser.dto'
import { INestApplication } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { hash } from 'bcrypt'

export async function registerAndCreateUser(
  app: INestApplication,
  dataSourceTest: DataSource,
): Promise<AuthenticateDTO> {
  let cachedToken: AuthenticateDTO | null = null

  if (cachedToken) {
    return cachedToken
  }

  const userRepository = new UserRepository(dataSourceTest)

  const existingUser = await userRepository.findByEmail('label@email.com')

  let user = { ...existingUser }

  if (!existingUser) {
    const hashPassword = await hash('Senha123', 10)

    user = await userRepository.add({
      id: 'c86bc092-89f3-42f2-8ee4-584cebb0f6b6',
      email: 'label2@email.com',
      firstName: 'John',
      lastName: 'Doe',
      password: hashPassword,
      created_at: new Date(),
    })
  }

  const response = await request(app.getHttpServer())
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .send({ email: user.email, password: 'Senha123' })

  if (!response.body || !response.body._data) {
    throw new Error('Resposta inesperada do servidor')
  }

  cachedToken = response.body._data || response.body.data

  if (!cachedToken.user) {
    throw new Error(
      'Estrutura de token inválida: propriedade "user" não encontrada',
    )
  }

  return {
    user: cachedToken.user,
    backendTokens: { ...cachedToken.backendTokens },
  }
}
