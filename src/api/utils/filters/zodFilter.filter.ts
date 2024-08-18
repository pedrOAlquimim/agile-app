import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { CustomResponse } from 'src/core/response/customResponse'
import { ZodError } from 'zod'

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = 400

    const customResponse = new CustomResponse<null>()

    const zodErrors = exception.errors.map((item) => item.message)
    customResponse.addErrorAndExceptionMessage(zodErrors, exception.message)

    response.status(status).json(customResponse)
  }
}
