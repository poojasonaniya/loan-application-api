import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): string {
    return this.authService.registerUser(username, password);
  }

  @Post('login')
  loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): string {
    return this.authService.loginUser(username, password);
  }
}
