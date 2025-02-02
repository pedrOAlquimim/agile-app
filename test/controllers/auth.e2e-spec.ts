import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as fs from 'fs'
import { AuthModule } from 'src/api/controllers/auth.module'
import {
  dataSourceTest,
  sqliteTestDbConfig,
} from 'src/infrastructure/persistence/config/dataSourceTest'

describe('AuthController E2E Tests', () => {
  let app: INestApplication

  const removeDb = async () => {
    fs.unlink('test/database/testDb.sqlite', (err) => {
      if (err) {
        return
      }
    })
  }

  beforeAll(async () => {
    await removeDb()
    await dataSourceTest.initialize()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, TypeOrmModule.forRoot(sqliteTestDbConfig)],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    const entities = dataSourceTest.entityMetadatas
    for (const entity of entities) {
      const repository = dataSourceTest.getRepository(entity.name)
      await repository.clear()
    }
  })

  afterAll(async () => {
    await app.close()
    await dataSourceTest.destroy()
    await removeDb()
  })

  describe('Tests with /register, /login', () => {
    describe('/register', () => {
      it('(POST) should create a user', async () => {
        const user = {
          email: 'label@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'Senha123',
          confirmPassword: 'Senha123',
        }

        const test = await request(app.getHttpServer())
          .post('/api/auth/register')
          .set('Accept', 'application/json')
          .send(user)

        expect(test.statusCode).toBe(201)
        expect(test.body).toEqual({
          _success: true,
          _data: {
            id: expect.any(String),
            email: 'label@email.com',
            firstName: 'John',
            lastName: 'Doe',
            password: expect.any(String),
            created_at: expect.any(String),
          },
        })
      })

      it('(POST) should not be able to create a user with email has more than 50 caracteres', async () => {
        const user = {
          email: 'labellabellabellabellabellabellabellabellabellabel@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'Senha123',
          confirmPassword: 'Senha123',
        }

        const test = await request(app.getHttpServer())
          .post('/api/auth/register')
          .set('Accept', 'application/json')
          .send(user)

        expect(test.statusCode).toBe(400)
        expect(test.body).toEqual({
          success: false,
          errors: ['Email is not more than 50 characters'],
          data: null,
        })
      })

      it('(POST) should not be able to create a user with password has more than 16 caracteres', async () => {
        const user = {
          email: 'label@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'Senha1234567891011',
          confirmPassword: 'Senha1234567891011',
        }

        const test = await request(app.getHttpServer())
          .post('/api/auth/register')
          .set('Accept', 'application/json')
          .send(user)

        expect(test.statusCode).toBe(400)
        expect(test.body).toEqual({
          success: false,
          errors: [
            'Password is not more than 16 characters',
            'Confirm Password is not more than 16 characters',
          ],
          data: null,
        })
      })

      it('(POST) should not be able to create a user with password and confirm does not match', async () => {
        const user = {
          email: 'label@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'Senha1234',
          confirmPassword: 'Senha1234567891011',
        }

        const test = await request(app.getHttpServer())
          .post('/api/auth/register')
          .set('Accept', 'application/json')
          .send(user)

        expect(test.statusCode).toBe(400)
        expect(test.body).toEqual({
          success: false,
          errors: [
            'Confirm Password is not more than 16 characters',
            "Passwords don't match",
          ],
          data: null,
        })
      })
    })

    describe('/login', () => {
      it('(POST) should login the user', async () => {
        const user = {
          email: 'label@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'Senha123',
          confirmPassword: 'Senha123',
        }

        const test = await request(app.getHttpServer())
          .post('/api/auth/register')
          .set('Accept', 'application/json')
          .send(user)

        const createdUser = test.body._data

        const sut = await request(app.getHttpServer())
          .post('/api/auth/login')
          .set('Accept', 'application/json')
          .send({ email: createdUser.email, password: 'Senha123' })

        expect(sut.statusCode).toBe(200)
        expect(sut.body).toEqual({
          _success: true,
          _data: {
            user: {
              id: expect.any(String),
              email: 'label@email.com',
              firstName: 'John',
              lastName: 'Doe',
              created_at: expect.any(String),
            },
            backendTokens: {
              accessToken: expect.any(String),
              refreshToken: expect.any(String),
            },
          },
        })
      })

      it('(POST) should not be able to login the user if the passwor or email is wrong', async () => {
        const user = {
          email: 'label@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'Senha123',
          confirmPassword: 'Senha123',
        }

        const test = await request(app.getHttpServer())
          .post('/api/auth/register')
          .set('Accept', 'application/json')
          .send(user)

        const createdUser = test.body._data

        const sut = await request(app.getHttpServer())
          .post('/api/auth/login')
          .set('Accept', 'application/json')
          .send({ email: createdUser.email, password: 'wrongPassword' })

        expect(sut.statusCode).toBe(401)
        expect(sut.body).toEqual({
          _success: false,
          _data: null,
          _errors: ['Email or password is wrong'],
        })
      })
    })
  })
})
