import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('signup')
  async signup(@Body() body) {
    return this.authService.signup(body);
  }
}
