import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';

@Entity('course_prices')
export class CoursePrice extends BaseEntity {
  @ManyToOne(() => Course, (course) => course.participants)
  course: Course;

  @Column({ length: 3 })
  currency: string;

  @Column({ type: 'int', default: 0 })
  amount: number;
}
