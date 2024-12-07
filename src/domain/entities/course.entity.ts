import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CourseParticipant } from './course-participants.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'date', nullable: true })
  starts_at: Date;

  @Column({ type: 'date', nullable: true })
  ends_at: Date;

  @OneToMany(() => CourseParticipant, (participant) => participant.course)
  participants: CourseParticipant[];
}
