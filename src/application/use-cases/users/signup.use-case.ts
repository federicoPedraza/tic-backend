import { UserRepository } from 'src/infrastructure/repositories';
import { SignupDTO } from 'src/application/dtos';
import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities';
import { UserRole } from 'src/domain/types';
import * as bcrypt from 'bcrypt';

export class SignUpUseCase {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async execute({ email, password, username }: SignupDTO): Promise<string> {
    const user = await this.userRepository.get({ email });
    if (user) throw new Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const model: User = {
      email,
      password: encryptedPassword,
      username,
      role: UserRole.USER,
      hash: salt,
    };

    await this.userRepository.post(model);

    return 'done';
  }
}
