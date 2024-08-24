import { Inject, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { CreateUserDTO } from 'src/core/dtos/createUser.dto'
import { User } from 'src/core/entities/User.entity'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/ICreateUserUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

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

      const hashPassword = await hash(input.password, 10)

      const newUser = {
        id: randomUUID(),
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: hashPassword,
        created_at: new Date(),
      }

      await this.userRepository.add({ ...newUser })

      response.data = newUser

      return response
    } catch (ex) {
      response.addErrorAndExceptionMessage([''], ex.message)
      return response
    }
  }
}
