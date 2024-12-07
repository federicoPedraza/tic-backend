import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('course_participants')
export class CourseParticipant extends BaseEntity {
  @ManyToOne(() => User, (user) => user.courseParticipants)
  user: User;

  @ManyToOne(() => Course, (course) => course.participants)
  course: Course;

  @Column({ type: 'int', default: 0 })
  paid: number;
}
