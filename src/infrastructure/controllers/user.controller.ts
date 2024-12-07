import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HttpResponse } from './base.response';
import { JwtGuard } from '../config/auth/jwt.guard';
import { ReqUser, Roles } from '../config/decorators';
import { DisableUsersResponse, GetUsersResponse } from '../presentations';
import { RolesGuard } from '../config/auth/role.guard';
import { UserRole } from 'src/domain/types';
import { DisableUserDTO } from 'src/application/dtos';
import {
  DisableUserUseCase,
  GetUsersUseCase,
} from 'src/application/use-cases/admin';
import { User } from 'src/domain/entities';

@Controller('users')
export class UserController {
  constructor(
    private readonly disableUsersUseCase: DisableUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @Post('disable')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async disable(
    @Body() dto: DisableUserDTO,
    @ReqUser() user?: User,
  ): Promise<HttpResponse<DisableUsersResponse>> {
    const exceptions = await this.disableUsersUseCase.execute(
      dto.targets,
      user,
    );

    return {
      message: 'Users disabled successfuly',
      data: {
        exceptions,
      },
      status: HttpStatus.ACCEPTED,
    };
  }

  @Get('list')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async list(@ReqUser() user?: User): Promise<HttpResponse<GetUsersResponse>> {
    const users = await this.getUsersUseCase.execute(user);

    return {
      message: 'Users fetched successfuly',
      data: {
        results: users,
        count: users.length,
      },
      status: HttpStatus.OK,
    };
  }
}
