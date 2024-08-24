import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUserUseCase } from '../../application/use-cases/auth/createUser.use-case'
import { AuthController } from './auth.controller'
import { UserRepository } from 'src/infrastructure/persistence/repositories/UserRepository'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/ICreateUserUseCase.interface'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'
import { IAuthenticateUserUseCase } from 'src/core/interfaces/useCases/IAuthenticateUserUseCase.interface'
import { AnthenticateUserUseCase } from 'src/application/use-cases/auth/authenticateUser.use-case'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [
    JwtService,
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
  ],
  exports: [
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
  ],
})
export class AuthModule {}
