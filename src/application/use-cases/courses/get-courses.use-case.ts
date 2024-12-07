import { CourseRepository } from 'src/infrastructure/repositories';
import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities';
import { GetCoursesDTO } from 'src/application/dtos';
import { GetCoursesResponse } from 'src/infrastructure/presentations';

export class GetCoursesUseCase {
  constructor(@Inject() private readonly courseRepository: CourseRepository) {}

  async execute(dto: GetCoursesDTO, user?: User): Promise<GetCoursesResponse> {
    let filters = {};

    if (user && dto.participant) {
      filters = { participants: user.id };
    }

    const courses = await this.courseRepository.getAll(filters, {
      relations: ['participants'],
    });

    return {
      results: courses.map((course) => {
        return {
          data: { ...course, participants: undefined },
          participants: course.participants.length,
        };
      }),
      filters: dto,
    };
  }
}
