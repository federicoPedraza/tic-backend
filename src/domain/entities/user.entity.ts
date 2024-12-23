import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../types';
import { BaseEntity } from './base.entity';
import { CourseParticipant } from './course-participants.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  email: string;

  @Column({ nullable: true, length: 500 })
  hash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => CourseParticipant, (participant) => participant.user)
  courseParticipants?: CourseParticipant[];
}
