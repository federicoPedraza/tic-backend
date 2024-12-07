import {
  CourseParticipantRepository,
  CoursePriceRepository,
  CourseRepository,
} from 'src/infrastructure/repositories';
import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities';
import {
  GetCourseDetailsPrice,
  GetCourseDetailsResponse,
} from 'src/infrastructure/presentations';
import { CourseNotFound } from 'src/application/exceptions';

export class GetCourseDetailsUseCase {
  constructor(
    @Inject() private readonly courseRepository: CourseRepository,
    @Inject()
    private readonly courseParticipantsRepository: CourseParticipantRepository,
    @Inject() private readonly coursePriceRepository: CoursePriceRepository,
  ) {}

  async execute(
    courseId: string,
    requester?: User,
  ): Promise<GetCourseDetailsResponse> {
    const course = await this.courseRepository.get(
      { id: courseId },
      {
        relations: ['participants'],
      },
    );
    if (!course) throw new CourseNotFound();

    let isParticipant = false;

    if (requester) {
      const participant =
        await this.courseParticipantsRepository.findParticipantByUserAndCourse(
          requester.id,
          course.id,
        );

      isParticipant = !!participant;
    }

    const prices = await this.coursePriceRepository.get(course.id);
    const pricesMapped: GetCourseDetailsPrice[] = prices.map((price) => {
      return {
        value: price.amount,
        currency: price.currency,
      };
    });

    return {
      data: { ...course, participants: undefined, prices: undefined },
      prices: pricesMapped,
      participants: course.participants.length,
      isParticipant,
    };
  }
}
