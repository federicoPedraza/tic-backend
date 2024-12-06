import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUseCase } from 'src/application/use-cases/users';
import { User } from 'src/domain/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginUseCase: LoginUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User | undefined> {
    const user = await this.loginUseCase.execute({ email, password });
    return user;
  }
}
