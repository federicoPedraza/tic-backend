import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CreateTokenUseCase,
  SignUpUseCase,
} from 'src/application/use-cases/users';
import { HttpResponse } from './base.response';
import { LocalAuthGuard } from '../config/auth/local.guard';
import { User } from 'src/domain/entities';
import { JwtGuard } from '../config/auth/jwt.guard';
import { ReqUser } from '../config/decorators';
import { HealthResponse, LoginResponse, SignupRespone } from '../presentations';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupUseCase: SignUpUseCase,
    private readonly createTokenUseCase: CreateTokenUseCase,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: Request): Promise<HttpResponse<LoginResponse>> {
    const result = await this.createTokenUseCase.execute(request.user as User);

    return {
      message: 'Logged in successfully',
      data: result,
      status: HttpStatus.ACCEPTED,
    };
  }

  @Post('signup')
  async signup(@Req() request: Request): Promise<HttpResponse<SignupRespone>> {
    const data = request.body;

    const user = await this.signupUseCase.execute(data);
    const log = await this.createTokenUseCase.execute(user);

    return {
      message: 'Signed up successfully',
      data: {
        username: user.username,
        id: user.id,
        access_token: log.access_token,
      },
      status: HttpStatus.CREATED,
    };
  }

  @Get('health')
  @UseGuards(JwtGuard)
  async health(@ReqUser() user: User): Promise<HttpResponse<HealthResponse>> {
    return {
      message: 'Logged in successfully',
      data: {
        email: user.email,
        id: user.id,
      },
      status: HttpStatus.OK,
    };
  }
}
