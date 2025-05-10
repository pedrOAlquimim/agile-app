import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        const errorsMessage = error.errors.map((error) => {
          if (error.code == 'custom') {
            return error.message
          }
        })

        const filteresErrorsMessage = errorsMessage.filter((error) => {
          if (error) return error
        })

        throw new BadRequestException({
          success: false,
          errors: filteresErrorsMessage,
          data: null,
        })
      }
      throw error
    }
  }
}
