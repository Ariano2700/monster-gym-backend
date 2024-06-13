import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authtentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register auth into users table' })
  registerUser(@Body() userObject: RegisterAuthDto) {
    try {
      return this.authService.register(userObject);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Sing in whit token' })
  loginUser(@Body() userObject: LoginAuthDto) {
    return this.authService.login(userObject);
  }
}
