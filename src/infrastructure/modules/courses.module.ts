import { Module } from '@nestjs/common';
import { CourseController } from '../controllers';
import {
  CourseParticipantRepository,
  CoursePriceRepository,
  CourseRepository,
  UserRepository,
} from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Course,
  CourseParticipant,
  CoursePrice,
  User,
} from 'src/domain/entities';
import {
  CreateCourseUseCase,
  GetCourseDetailsUseCase,
  GetCoursesUseCase,
  JoinCourseUseCase,
} from 'src/application/use-cases/courses';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Course, CourseParticipant, CoursePrice]),
  ],
  controllers: [CourseController],
  providers: [
    CreateCourseUseCase,
    GetCoursesUseCase,
    GetCourseDetailsUseCase,
    JoinCourseUseCase,
    UserRepository,
    CourseRepository,
    CourseParticipantRepository,
    CoursePriceRepository,
  ],
})
export class CourseModule {}
