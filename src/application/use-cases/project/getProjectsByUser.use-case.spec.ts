/* eslint-disable prettier/prettier */
import { InMemoryProjectRepository } from "src/infrastructure/persistence/in-memory/in-memory-project-repository"
import { GetProjectsByUserUseCase } from "./getProjectsByUser.use-case"

let inMemoryProjectRepository: InMemoryProjectRepository
let sut: GetProjectsByUserUseCase

describe('Get projects by user use case', () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository()
    sut = new GetProjectsByUserUseCase(inMemoryProjectRepository)
  })

  it('should be able to return the project from one user', async () => {
    const userId = 'userTestId'

    await inMemoryProjectRepository.add({
      id: '1234',
      title: 'Test project',
      created_at: new Date(),
      projects_projectMembers: [{
        projectMember: {
          id: 'id test',
          userId,
          projects_projectMembers: [],
          created_at: new Date(),
        },
        id: 'id test',
        project: {
          id: '123',
          projects_projectMembers: [],
          title: 'Test project',
          column: [],
          created_at: new Date()
        },
        role: {
          created_at: new Date(),
          id: '1234',
          role: 'test role'
        },
        created_at: new Date()
      },
      ],
      column: [],
    })

    await inMemoryProjectRepository.add({
      id: "123145",
      title: 'Test project 2',
      created_at: new Date(),
      projects_projectMembers: [{
        projectMember: {
          id: 'id test',
          userId,
          projects_projectMembers: [],
          created_at: new Date(),
        },
        id: 'id test',
        project: {
          id: '1234',
          projects_projectMembers: [],
          title: 'Test project 2',
          column: [],
          created_at: new Date()
        },
        role: {
          created_at: new Date(),
          id: '12345',
          role: 'test role'
        },
        created_at: new Date()
      },
      ],
      column: [],
    })

    const { data, success } = await sut.execute(userId)

    expect(data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        projects_projectMembers: expect.arrayContaining([
          expect.objectContaining({
            projectMember: {
              id: 'id test',
              userId,
              projects_projectMembers: expect.any(Array),
              created_at: expect.any(Date)
            }
          })
          
        ])
      })
    ]))
    expect(success).toBe(true)
  })
})