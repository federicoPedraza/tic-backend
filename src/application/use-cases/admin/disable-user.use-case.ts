import { UserRepository } from 'src/infrastructure/repositories';
import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities';

export class DisableUserUseCase {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async execute(targets: string[], requester: User): Promise<string[]> {
    const users = await this.userRepository.findAllByIds(targets);

    await Promise.all(
      users
        .filter((u) => u.id !== requester.id)
        .map((user) => this.userRepository.delete(user)),
    );

    const targetsOutsideDatabase = targets.filter(
      (target) =>
        !users.find((user) => user.id === target) || target === requester.id,
    );

    return targetsOutsideDatabase;
  }
}
