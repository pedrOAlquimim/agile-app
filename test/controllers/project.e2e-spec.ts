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
    try {
      fs.unlinkSync('test/database/testDb.sqlite')
    } catch (error) {}
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
    describe('/get', () => {
      it('should be able to return project from a user', async () => {
        const { user, backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        await request(app.getHttpServer())
          .post(`/api/project/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ title: 'projectToReturn' })

        const sut = await request(app.getHttpServer())
          .get(`/api/project/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)

        expect(sut.statusCode).toBe(200)
        expect(sut.body).toEqual({
          _success: true,
          _data: [
            {
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
              created_at: expect.any(String),
              id: expect.any(String),
              title: 'projectToReturn',
            },
          ],
        })
      })
    })

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

      it('(POST) should return 400 if does not have payload', async () => {
        const { user, backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const sut = await request(app.getHttpServer())
          .post(`/api/project/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send()

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toEqual({
          success: false,
          data: null,
          errors: [],
        })
      })

      it('(POST) should return 400 if payload is wrong', async () => {
        const { user, backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const sut = await request(app.getHttpServer())
          .post(`/api/project/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ wrongTitle: 'worng' })

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toEqual({
          success: false,
          data: null,
          errors: [],
        })
      })
    })

    describe('/delete', () => {
      it('should be able to delete a project', async () => {
        const { user, backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const projectResponse = await request(app.getHttpServer())
          .post(`/api/project/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ title: 'projectToDelete' })

        const existingProject = projectResponse.body._data

        const sut = await request(app.getHttpServer())
          .delete(`/api/project/${existingProject.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)

        expect(sut.statusCode).toBe(200)
        expect(sut.body).toEqual({
          _success: true,
          _data: {
            created_at: expect.any(String),
            id: existingProject.id,
            title: 'projectToDelete',
          },
        })
      })

      it('should not be able to delete a project that does not exist', async () => {
        const { backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const sut = await request(app.getHttpServer())
          .delete(`/api/project/IdThatDoesNotExist`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)

        expect(sut.statusCode).toBe(404)
        expect(sut.body).toEqual({
          _success: false,
          _data: null,
          _errors: ['Project does not exist'],
        })
      })
    })

    describe('/update', () => {
      it('should be able to update a project', async () => {
        const { user, backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const projectResponse = await request(app.getHttpServer())
          .post(`/api/project/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ title: 'projectToDelete' })

        const existingProject = projectResponse.body._data

        const sut = await request(app.getHttpServer())
          .put(`/api/project/${existingProject.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ title: 'projectWithUpdatedName' })

        expect(sut.statusCode).toBe(201)
        expect(sut.body).toEqual({
          _success: true,
          _data: {
            created_at: expect.any(String),
            id: existingProject.id,
            title: 'projectWithUpdatedName',
          },
        })
      })

      it('should not be able to update a project that does not exist', async () => {
        const { backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const sut = await request(app.getHttpServer())
          .put(`/api/project/IdThatDoesNotExist`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ title: 'projectWithUpdatedName' })

        expect(sut.statusCode).toBe(404)
        expect(sut.body).toEqual({
          _success: false,
          _data: null,
          _errors: ['Project does not exist'],
        })
      })

      it('should return 400 if payload is wrong', async () => {
        const { backendTokens } = await registerAndCreateUser(
          app,
          dataSourceTest,
        )

        const sut = await request(app.getHttpServer())
          .put(`/api/project/IdThatDoesNotExist`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokens.accessToken}`)
          .send({ wrongPayload: 'projectWithUpdatedName' })

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toEqual({
          data: null,
          errors: [],
          success: false,
        })
      })
    })
  })
})
