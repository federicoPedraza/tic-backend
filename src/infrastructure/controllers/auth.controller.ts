import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignUpUseCase } from 'src/application/use-cases/users';
import { HttpResponse } from './base.response';
import { LoginResponse } from './auth.responses';
import { LocalAuthGuard } from '../config/auth/local.guard';
import { AuthenticatedGuard } from '../config/auth/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly signupUseCase: SignUpUseCase) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: Request): Promise<HttpResponse<LoginResponse>> {
    if (!request.isAuthenticated())
      throw new UnauthorizedException('Login failed');

    return {
      message: 'Logged in successfully',
      data: request.user as any,
      status: HttpStatus.ACCEPTED,
    };
  }

  @Post('signup')
  async signup(@Req() request: Request, @Res() response: Response) {
    const data = request.body;

    const token = await this.signupUseCase.execute(data);

    response.send(token);
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() request: Request, @Res() response: Response) {
    request.session.destroy((error) => {
      if (error) throw error;
      response.send('Logged out');
    });
  }

  @Get('health')
  @UseGuards(AuthenticatedGuard)
  async health(@Res() response: Response) {
    response.send('Logged in');
  }
}
