import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { ISession } from 'connect-typeorm';

@Entity({ name: 'sessions' })
export class Session implements ISession {
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Index()
  @Column('bigint')
  expiredAt: number;

  @Column('text')
  json: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
