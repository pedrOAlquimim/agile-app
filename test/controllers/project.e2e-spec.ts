import * as request from 'supertest'
import * as fs from 'fs'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectModule } from 'src/api/controllers/project.module'
import {
  dataSourceTest,
  sqliteTestDbConfig,
} from 'src/infrastructure/persistence/config/dataSourceTest'
import { registerAndCreateUser } from '../utils/register-and-authenticate-user'
import { AuthModule } from 'src/api/controllers/auth.module'

describe('Project controller E2E Tests', () => {
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
      imports: [
        ProjectModule,
        AuthModule,
        TypeOrmModule.forRoot(sqliteTestDbConfig),
      ],
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

  describe('Tests with /create, /delete, /update', () => {
    describe('/create', () => {
      it('(POST) should be able to create a project', async () => {
        const { user, backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const sut = await request(app.getHttpServer())
          .post(`/api/project/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ title: 'newProject' })

        expect(sut.statusCode).toBe(201)
        expect(sut.body).toEqual({
          _success: true,
          _data: {
            id: expect.any(String),
            title: 'newProject',
            column: expect.any(Array),
            created_at: expect.any(String),
            projects_projectMembers: [
              {
                created_at: expect.any(String),
                id: expect.any(String),
                projectMember: {
                  created_at: expect.any(String),
                  id: expect.any(String),
                  userId: user.id,
                },
              },
            ],
          },
        })
      })
    })
  })
})
