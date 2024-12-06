import { User } from 'src/domain/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async get(user: Partial<User>): Promise<User | undefined> {
    return this.repository.findOne({ where: user });
  }

  async post(user: Partial<User>): Promise<User> {
    return this.repository.save(user);
  }

  async validate(email: string, password: string): Promise<User | undefined> {
    const user = await this.get({ email });
    if (!user) return undefined;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : undefined;
  }
}
