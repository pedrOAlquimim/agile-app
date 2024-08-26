import { Module } from '@nestjs/common'
import { ContactController } from './contact.controller'
import { ContactRepository } from 'src/infrastructure/persistence/repositories/ContactRepository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IContactRepository } from 'src/core/interfaces/repositories/IContactRepository.interface'
import { ICreateContactUseCase } from 'src/core/interfaces/useCases/ICreateContactUseCase.interface'
import { CreateContactUseCase } from 'src/application/use-cases/contact/createContact.use-case'
import { UpdateContactUseCase } from 'src/application/use-cases/contact/updateContact.use-case'
import { IUpdateContactUseCase } from 'src/core/interfaces/useCases/IUpdateContactUseCase.interface'
import { IDeleteContactUseCase } from 'src/core/interfaces/useCases/IDeleteContactUseCase.interface'
import { DeleteContactUseCase } from 'src/application/use-cases/contact/deleteContact.use-case'
import { GetContactByUserUseCase } from 'src/application/use-cases/contact/getContactsByUser.use-case'
import { IGetContactsByUserUseCase } from 'src/core/interfaces/useCases/IGetContactsByUserUseCase.interface'
import { JwtGuard } from '../utils/guards/jwtGuard.guard'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([ContactRepository])],
  controllers: [ContactController],
  providers: [
    JwtService,
    JwtGuard,
    {
      provide: ICreateContactUseCase,
      useClass: CreateContactUseCase,
    },
    {
      provide: IUpdateContactUseCase,
      useClass: UpdateContactUseCase,
    },
    {
      provide: IDeleteContactUseCase,
      useClass: DeleteContactUseCase,
    },
    {
      provide: IGetContactsByUserUseCase,
      useClass: GetContactByUserUseCase,
    },
    {
      provide: IContactRepository,
      useClass: ContactRepository,
    },
  ],
  exports: [
    {
      provide: ICreateContactUseCase,
      useClass: CreateContactUseCase,
    },
    {
      provide: IUpdateContactUseCase,
      useClass: UpdateContactUseCase,
    },
    {
      provide: IDeleteContactUseCase,
      useClass: DeleteContactUseCase,
    },
    {
      provide: IGetContactsByUserUseCase,
      useClass: GetContactByUserUseCase,
    },
  ],
})
export class ContactModule {}
