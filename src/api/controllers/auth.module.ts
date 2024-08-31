import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUserUseCase } from '../../application/use-cases/auth/createUser.use-case'
import { AuthController } from './auth.controller'
import { UserRepository } from 'src/infrastructure/persistence/repositories/UserRepository'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/auth/ICreateUserUseCase.interface'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'
import { IAuthenticateUserUseCase } from 'src/core/interfaces/useCases/auth/IAuthenticateUserUseCase.interface'
import { AnthenticateUserUseCase } from 'src/application/use-cases/auth/authenticateUser.use-case'
import { JwtService } from '@nestjs/jwt'
import { RefreshJwtGuard } from '../utils/guards/refreshJwtGuard.guard'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { IRefreshTokenUseCase } from 'src/core/interfaces/useCases/auth/IRefreshTokenUseCase.interface'
import { RefreshTokenUseCase } from 'src/application/use-cases/auth/refreshToken.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [
    JwtService,
    RefreshJwtGuard,
    JwtGuard,
    {
      provide: ICreateUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IAuthenticateUserUseCase,
      useClass: AnthenticateUserUseCase,
    },
    {
      provide: IRefreshTokenUseCase,
      useClass: RefreshTokenUseCase,
    },
  ],
  exports: [
    JwtService,
    RefreshJwtGuard,
    JwtGuard,
    {
      provide: ICreateUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IAuthenticateUserUseCase,
      useClass: AnthenticateUserUseCase,
    },
    {
      provide: IRefreshTokenUseCase,
      useClass: RefreshTokenUseCase,
    },
  ],
})
export class AuthModule {}
