import { CourseParticipant } from 'src/domain/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseParticipantRepository {
  constructor(
    @InjectRepository(CourseParticipant)
    private readonly repository: Repository<CourseParticipant>,
  ) {}

  async get(
    participant: Partial<CourseParticipant>,
    options?: any,
  ): Promise<CourseParticipant | undefined> {
    return this.repository.findOne({ where: participant, ...options });
  }

  async findParticipantByUserAndCourse(
    userId: string,
    courseId: string,
  ): Promise<CourseParticipant | undefined> {
    return this.repository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
      relations: ['user', 'course'],
    });
  }

  async findParticipantsByUser(userId: string): Promise<CourseParticipant[]> {
    return this.repository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'course'],
    });
  }

  async findParticipantsCountByCourse(courseId: string): Promise<number> {
    return this.repository.count({ where: { course: { id: courseId } } });
  }

  async getAll(
    filters: Partial<CourseParticipant>,
  ): Promise<CourseParticipant[]> {
    return this.repository.find({ where: filters });
  }

  async post(
    participant: Partial<CourseParticipant>,
  ): Promise<CourseParticipant> {
    return this.repository.save(participant);
  }
}
