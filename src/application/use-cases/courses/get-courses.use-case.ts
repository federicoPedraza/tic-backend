import {
  CourseParticipantRepository,
  CourseRepository,
} from 'src/infrastructure/repositories';
import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities';
import { GetCoursesDTO } from 'src/application/dtos';
import {
  GetCoursesResponse,
  GetCoursesResponseResult,
} from 'src/infrastructure/presentations';
import { UserRole } from 'src/domain/types';
import { ForbiddenResource } from 'src/domain/exceptions';

export class GetCoursesUseCase {
  constructor(
    @Inject() private readonly courseRepository: CourseRepository,
    @Inject()
    private readonly courseParticipantRepository: CourseParticipantRepository,
  ) {}

  async execute(dto: GetCoursesDTO, user?: User): Promise<GetCoursesResponse> {
    let courses: GetCoursesResponseResult[] = [];

    if (!dto.participant) {
      const result = await this.courseRepository.getAll(
        {},
        {
          relations: ['participants'],
        },
      );

      courses = result.map((course) => {
        return {
          ...course,
          participants: undefined,
          participantCount: course.participants.length,
        };
      });
    } else {
      const participants =
        await this.courseParticipantRepository.findParticipantsByUser(user.id);

      const participantCounts = await Promise.all(
        participants.map((participant) =>
          this.courseParticipantRepository.findParticipantsCountByCourse(
            participant.course.id,
          ),
        ),
      );

      courses = participants.map((participant, index) => ({
        ...participant.course,
        participants: undefined,
        participantCount: participantCounts[index],
      }));
    }

    if (dto.showPrivate && user && user.role !== UserRole.ADMIN)
      throw new ForbiddenResource();

    if (!dto.showPrivate || (user && user.role !== UserRole.ADMIN))
      courses = courses.filter((course) => course.is_public === true);

    return {
      results: courses,
      filters: dto,
    };
  }
}
