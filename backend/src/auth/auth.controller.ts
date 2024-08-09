import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dtos/signin.dto.js';
import { SignUpDto } from './dtos/signup.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto){
    return this.authService.signUp(signUpDto);
  }
}
