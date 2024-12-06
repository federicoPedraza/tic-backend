import { Module } from '@nestjs/common';
import { AuthController } from '../controllers';
import { LoginUseCase, SignUpUseCase } from 'src/application/use-cases/users';
import { UserRepository } from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, User } from 'src/domain/entities';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../config/auth/local.strategy';
import { SessionSerializer } from '../config/auth/session.serializer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User, Session]),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    SignUpUseCase,
    UserRepository,
    LocalStrategy,
    SessionSerializer,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
