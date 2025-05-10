import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtGuard } from 'src/api/utils/guards/jwtGuard.guard'

describe('JWT Guard tests', () => {
  let jwtGuard: JwtGuard
  let jwtService: JwtService

  const mockExecutionContext = (
    authorizationHeader?: string,
  ): Partial<ExecutionContext> => ({
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: { authorization: authorizationHeader },
      } as unknown as Partial<Request>),
      getResponse: jest.fn().mockReturnValue({} as Partial<Response>),
      getNext: jest.fn(),
    }),
  })

  beforeEach(() => {
    jwtService = new JwtService(null)
    jwtGuard = new JwtGuard(jwtService)
  })

  it('should be defined', () => {
    expect(jwtGuard).toBeDefined()
  })

  it('should return true if token is valid', async () => {
    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ userId: 1 })

    const context = mockExecutionContext(
      'Bearer valid-token',
    ) as ExecutionContext
    const result = await jwtGuard.canActivate(context)

    expect(result).toBe(true)
  })

  it('should throw UnauthorizedException if token is invalid', async () => {
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockRejectedValue(new Error('Invalid token'))

    const context = mockExecutionContext(
      'Bearer invalid-token',
    ) as ExecutionContext

    await expect(jwtGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    )
  })

  it('should throw UnauthorizedException if no token is provided', async () => {
    const context = mockExecutionContext(undefined) as ExecutionContext

    await expect(jwtGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    )
  })
})
