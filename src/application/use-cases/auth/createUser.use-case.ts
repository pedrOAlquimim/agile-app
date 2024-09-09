import { Inject, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { CreateUserDTO } from 'src/core/dtos/createUser.dto'
import { UserDTO } from 'src/core/dtos/user.dto'
import { IUserRepository } from 'src/core/interfaces/repositories/IUserRepository.interface'
import { ICreateUserUseCase } from 'src/core/interfaces/useCases/auth/ICreateUserUseCase.interface'
import { CustomResponse } from 'src/core/response/customResponse'

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateUserDTO) {
    const response = new CustomResponse<UserDTO>()

    try {
      const userAlreadyExist = await this.userRepository.findByEmail(
        input.email,
      )
      if (userAlreadyExist) {
        return response.addError(['User already exist'])
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

      const result: UserDTO = { ...newUser }

      response.data = result

      return response
    } catch (ex) {
      throw new Error('Was not possible to connect with data base')
    }
  }
}
