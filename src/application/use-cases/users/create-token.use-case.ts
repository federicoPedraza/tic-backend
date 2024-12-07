import { User } from 'src/domain/entities';
import { AccessTokenPayload } from 'src/domain/types';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/infrastructure/presentations';
import { Inject } from '@nestjs/common';

export class CreateTokenUseCase {
  constructor(@Inject() private readonly jwtService: JwtService) {}

  async execute(body: User): Promise<LoginResponse> {
    const payload: AccessTokenPayload = {
      email: body.email,
      id: body.id,
      role: body.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
