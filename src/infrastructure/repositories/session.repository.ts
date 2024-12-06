import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/domain/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly repository: Repository<Session>,
  ) {}
}
