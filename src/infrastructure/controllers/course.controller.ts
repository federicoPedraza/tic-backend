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
import {
  CreateCourseUseCase,
  GetCoursesUseCase,
  JoinCourseUseCase,
} from 'src/application/use-cases/courses';
import { CreateCourseResponse, GetCoursesResponse } from '../presentations';
import { ReqUser, Roles } from '../config/decorators';
import { User } from 'src/domain/entities';
import { GetCoursesDTO, JoinCourseDTO } from 'src/application/dtos';
import { RolesGuard } from '../config/auth/role.guard';
import { UserRole } from 'src/domain/types';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly getCoursesUseCase: GetCoursesUseCase,
    private readonly joinCourseUseCase: JoinCourseUseCase,
  ) {}

  @Post('create')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto): Promise<HttpResponse<CreateCourseResponse>> {
    const course = await this.createCourseUseCase.execute(dto);

    return {
      message: 'Course created successfuly',
      data: {
        id: course.id,
      },
      status: HttpStatus.OK,
    };
  }

  @Get('list')
  async get(
    @Body() dto: GetCoursesDTO,
    @ReqUser() user?: User,
  ): Promise<HttpResponse<GetCoursesResponse>> {
    const data = await this.getCoursesUseCase.execute(dto, user);

    return {
      message: 'Courses fetched successfuly',
      data,
      status: HttpStatus.OK,
    };
  }

  @Post('join')
  @UseGuards(JwtGuard)
  async join(
    @Body() dto: JoinCourseDTO,
    @ReqUser() user: User,
  ): Promise<HttpResponse<undefined>> {
    await this.joinCourseUseCase.execute(dto, user);

    return {
      message: 'Course joined successfuly',
      data: undefined,
      status: HttpStatus.OK,
    };
  }
}
