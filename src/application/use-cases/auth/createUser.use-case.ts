import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { CreateUserDTO } from 'src/core/dtos/createUser.dto'
import { User } from 'src/core/entities/User.entity'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/ICreateUserUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'
import { UserRepository } from 'src/infrastructure/persistence/repositories/UserRepository'

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserDTO) {
    const response = new CustomResponse<User>()

    try {
      const userAlreadyExist = await this.userRepository.findByEmail(
        input.email,
      )
      if (userAlreadyExist) {
        response.addError(['User already exist'])
        return response
      }

      const hashPassword = hash(input.password, 10)

      const newUser: User = {
        id: randomUUID(),
        password: hashPassword,
        created_at: new Date(),
        ...input,
      }

      await this.userRepository.add({ ...newUser })

      response.data = newUser

      return response
    } catch (ex) {
      console.log(ex)
      response.addErrorAndExceptionMessage([''], ex.message)
      return response
    }
  }
}
