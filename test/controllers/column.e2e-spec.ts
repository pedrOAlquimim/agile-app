import * as request from 'supertest'
import * as fs from 'fs'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/api/controllers/auth.module'
import { ColumnModule } from 'src/api/controllers/column.module'
import {
  dataSourceTest,
  sqliteTestDbConfig,
} from 'src/infrastructure/persistence/config/dataSourceTest'
import { ProjectRepository } from 'src/infrastructure/persistence/repositories/ProjectRepository'
import { registerAndCreateUser } from '../utils/register-and-authenticate-user'
import { ProjectMembers } from 'src/core/entities/ProjectMembers.entity'
import { Project } from 'src/core/entities/Project.entity'
import { UserDTO } from 'src/core/dtos/user.dto'

describe('Column controller E2E Tests', () => {
  let app: INestApplication
  let userObj: UserDTO
  let backendTokensObj: {
    accessToken?: string
    refreshToken?: string
  }

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
        ColumnModule,
        AuthModule,
        TypeOrmModule.forRoot(sqliteTestDbConfig),
      ],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    const { user, backendTokens } = await registerAndCreateUser(
      app,
      dataSourceTest,
    )

    userObj = user
    backendTokensObj = { ...backendTokens }
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
    describe('/post', () => {
      it('should create be able to create a column', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        const sut = await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumn',
            projectId: id,
          })

        expect(sut.statusCode).toBe(201)
        expect(sut.body).toEqual({
          _success: true,
          _data: {
            cards: [],
            created_at: expect.any(String),
            id: expect.any(String),
            nextColumnId: null,
            previusColumnId: null,
            project: {
              created_at: expect.any(String),
              id: expect.any(String),
              title: 'ProjectCreatedToColumn',
            },
            title: 'NewColumn',
          },
        })
      })

      it('should not be able to create a column with wrong payload', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        const sut = await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send()

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toEqual({
          success: false,
          data: null,
          errors: [],
        })
      })

      it('should return error if column title is higher than 30 caracters', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        const sut = await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumnfnfpsfnsfonsfsnsfsoifn[psnfsnfsnofsnonfdosn',
            projectId: id,
          })

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toEqual({
          success: false,
          data: null,
          errors: ['Column title should have a maximum of 30 caracters'],
        })
      })
    })

    describe('/get', () => {
      it('should return all column from project', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumn',
            projectId: id,
          })

        const sut = await request(app.getHttpServer())
          .get(`/api/column/${id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)

        expect(sut.statusCode).toBe(200)
        expect(sut.body).toEqual({
          _success: true,
          _data: [
            {
              created_at: expect.any(String),
              id: expect.any(String),
              title: 'NewColumn',
              cards: [],
            },
          ],
        })
      })

      it('should not return column if project does not exist', async () => {
        await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumn',
            projectId: 'wrongProjectId',
          })

        const sut = await request(app.getHttpServer())
          .get(`/api/column/wrongProjectId`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)

        expect(sut.statusCode).toBe(404)
        expect(sut.body).toEqual({
          _data: null,
          _success: false,
          _errors: ['Project does not exist'],
        })
      })
    })

    describe('/delete', () => {
      it('should be able to delete a column', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        const column = await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumn',
            projectId: id,
          })

        const columnData = column.body._data || column.body.data

        const sut = await request(app.getHttpServer())
          .delete(`/api/column/${columnData.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)

        expect(sut.statusCode).toBe(204)
      })

      it('should be able to delete a column tha does not exist', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        const sut = await request(app.getHttpServer())
          .delete(`/api/column/wrongColumnId`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)

        expect(sut.statusCode).toBe(404)
        expect(sut.body).toEqual({
          _success: false,
          _data: null,
          _errors: ['Column does not exist'],
        })
      })
    })

    describe('/update', () => {
      it('should be able to update a column', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        const column = await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumn',
            projectId: id,
          })

        const columnData = column.body._data || column.body.data

        const sut = await request(app.getHttpServer())
          .put(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            id: columnData.id,
            title: 'NewColumnTitle',
          })

        expect(sut.statusCode).toBe(200)
        expect(sut.body).toEqual({
          _success: true,
          _data: {
            title: 'NewColumnTitle',
            created_at: expect.any(String),
            id: expect.any(String),
          },
        })
      })

      it('should be able to update a column with wrong payload', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumn',
            projectId: id,
          })

        const sut = await request(app.getHttpServer())
          .put(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send()

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toEqual({
          success: false,
          data: null,
          errors: [],
        })
      })

      it('should return error if new column title is higher than 30 caracters', async () => {
        const projectRepository = new ProjectRepository(dataSourceTest)

        const date = new Date()
        const id = '0db1b684-7427-4d19-abf4-dd0f7028e79e'
        await projectRepository.add({
          id,
          column: [],
          created_at: date,
          title: 'ProjectCreatedToColumn',
          projects_projectMembers: [
            {
              created_at: new Date(),
              id: userObj.id,
              role: {
                id: 'b383ce38-1903-4886-b5ca-764dec3f57f1',
                created_at: new Date(),
                role: 'admin',
              },
              projectMember: new ProjectMembers(),
              project: new Project(),
            },
          ],
        })

        const column = await request(app.getHttpServer())
          .post(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            title: 'NewColumn',
            projectId: id,
          })

        const columnData = column.body._data || column.body.data

        const sut = await request(app.getHttpServer())
          .put(`/api/column`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${backendTokensObj.accessToken}`)
          .send({
            id: columnData.id,
            title:
              'NewColumnTitlesagggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
          })

        expect(sut.statusCode).toBe(400)
        expect(sut.body).toEqual({
          success: false,
          data: null,
          errors: ['Column title should have a maximum of 30 caracters'],
        })
      })
    })
  })
})
