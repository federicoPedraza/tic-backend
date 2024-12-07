import { UserRepository } from 'src/infrastructure/repositories';
import { LoginDTO } from 'src/application/dtos';
import { Inject } from '@nestjs/common';
import { InvalidPasswordOrEmail } from 'src/domain/exceptions';
import { User } from 'src/domain/entities';

export class LoginUseCase {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async execute({ email, password }: LoginDTO): Promise<User> {
    const user = await this.userRepository.validate(email, password);
    if (!user) throw new InvalidPasswordOrEmail();

    return user;
  }
}
