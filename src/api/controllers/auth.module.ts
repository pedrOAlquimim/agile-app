import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUserUseCase } from '../../application/use-cases/auth/createUser.use-case'
import { AuthController } from './auth.controller'
import { UserRepository } from 'src/infrastructure/persistence/repositories/UserRepository'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class AuthModule {}
