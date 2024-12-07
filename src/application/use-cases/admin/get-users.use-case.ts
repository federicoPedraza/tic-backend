import { UserRepository } from 'src/infrastructure/repositories';
import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities';
import { GetUsersResponseItem } from 'src/infrastructure/presentations';

export class GetUsersUseCase {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async execute(requester: User): Promise<GetUsersResponseItem[]> {
    const users = await this.userRepository.find({});
    return users
      .filter((u) => u.id !== requester.id)
      .map((user) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      });
  }
}
