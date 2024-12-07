import { UserRepository } from 'src/infrastructure/repositories';
import { Inject } from '@nestjs/common';
import { LoginResponse } from 'src/infrastructure/controllers';
import { User } from 'src/domain/entities';
import { AccessTokenPayload } from 'src/domain/types';
import { JwtService } from '@nestjs/jwt';

export class CreateTokenUseCase {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(body: User): Promise<LoginResponse> {
    const payload: AccessTokenPayload = { email: body.email, userId: body.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
