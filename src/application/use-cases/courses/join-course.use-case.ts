import {
  CourseParticipantRepository,
  CourseRepository,
  UserRepository,
} from 'src/infrastructure/repositories';
import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities';
import { JoinCourseDTO } from 'src/application/dtos';
import { AlreadyParticipant, CourseNotFound } from 'src/application/exceptions';
import { UserNotFound } from 'src/domain/exceptions';

export class JoinCourseUseCase {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    @Inject() private readonly courseRepository: CourseRepository,
    @Inject()
    private readonly courseParticipantsRepository: CourseParticipantRepository,
  ) {}

  async execute(dto: JoinCourseDTO, reqUser: User): Promise<boolean> {
    const course = await this.courseRepository.get({ id: dto.courseId });
    if (!course) throw new CourseNotFound();

    const user = await this.userRepository.get({ id: reqUser.id });
    if (!user) throw new UserNotFound();

    const alreadyParticipant =
      await this.courseParticipantsRepository.findParticipantByUserAndCourse(
        user.id,
        course.id,
      );

    if (alreadyParticipant) throw new AlreadyParticipant();

    await this.courseParticipantsRepository.post({
      course,
      user,
      paid: dto.paid || 0,
    });

    return true;
  }
}
