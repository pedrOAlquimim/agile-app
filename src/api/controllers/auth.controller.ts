import { Controller, Post } from '@nestjs/common'

@Controller('api/auth')
export class AuthController {
  constructor() {}

  @Post('login')
  login() {}
}
