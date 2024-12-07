import { Module } from '@nestjs/common';
import { CourseController } from '../controllers';
import {
  CourseParticipantRepository,
  CourseRepository,
  UserRepository,
} from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, CourseParticipant, User } from 'src/domain/entities';
import {
  CreateCourseUseCase,
  GetCoursesUseCase,
  JoinCourseUseCase,
} from 'src/application/use-cases/courses';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course, CourseParticipant])],
  controllers: [CourseController],
  providers: [
    CreateCourseUseCase,
    GetCoursesUseCase,
    JoinCourseUseCase,
    UserRepository,
    CourseRepository,
    CourseParticipantRepository,
  ],
})
export class CourseModule {}
