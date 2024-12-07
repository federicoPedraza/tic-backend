import {
  CourseRepository,
  UserRepository,
} from 'src/infrastructure/repositories';
import { CreateCourseDTO } from 'src/application/dtos';
import { Inject } from '@nestjs/common';
import { Course } from 'src/domain/entities';

export class CreateCourseUseCase {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    @Inject() private readonly courseRepository: CourseRepository,
  ) {}

  async execute(dto: CreateCourseDTO): Promise<Course> {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    const model: Course = {
      name: dto.name,
      description: dto.description,
      starts_at: start,
      ends_at: end,
      is_public: dto.isPublic || false,
      participants: [],
      prices: [],
    };

    return await this.courseRepository.post(model);
  }
}
