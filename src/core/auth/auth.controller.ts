import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('refresh')
  refreshToken(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.refreshToken(updateAuthDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req) {
    await this.authService.logout(req.user.email);
    return { message: 'Logged out successfully' };
  }
}
