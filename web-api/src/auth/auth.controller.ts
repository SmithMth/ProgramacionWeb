import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginUserDto): any {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() newUser: CreateUserDto) {
      return this.authService.register(newUser);
  }
}
